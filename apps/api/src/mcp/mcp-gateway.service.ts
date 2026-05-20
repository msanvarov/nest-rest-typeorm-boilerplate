import { Injectable, Logger } from '@nestjs/common';

import {
  McpChatMessage,
  McpChatRequest,
  McpChatResponse,
  McpContentBlock,
  McpInventory,
  McpServerInfo,
  McpToolInvocationRequest,
  McpToolInvocationResponse,
  McpToolSummary,
} from '@starter/mcp-types';

import { McpClientService } from './mcp-client.service';
import { McpServerService } from './mcp-server.service';

/**
 * Aggregates the local in-process MCP server with any remote MCP servers
 * the client connected to, presents a single inventory to the Angular UI,
 * routes tool invocations to the correct backing server, and runs the
 * chat-preview heuristic that turns a user message into a tool call when
 * it can.
 */
@Injectable()
export class McpGatewayService {
  private readonly logger = new Logger(McpGatewayService.name);

  constructor(
    private readonly local: McpServerService,
    private readonly client: McpClientService,
  ) {}

  inventory(): McpInventory {
    const localInfo: McpServerInfo = {
      id: this.local.id,
      name: this.local.name,
      version: this.local.version,
      kind: 'local',
      connected: true,
    };

    return {
      servers: [localInfo, ...this.client.listConnections()],
      tools: [...this.local.listTools(), ...this.client.listTools()],
      resources: [
        ...this.local.listResources(),
        ...this.client.listResources(),
      ],
      prompts: this.client.listPrompts(),
    };
  }

  async invokeTool(
    request: McpToolInvocationRequest,
  ): Promise<McpToolInvocationResponse> {
    try {
      if (request.serverId === this.local.id) {
        const text = await this.local.invokeTool(
          request.name,
          request.arguments ?? {},
        );
        return { content: [{ type: 'text', text }] };
      }
      const content = await this.client.invokeTool(
        request.serverId,
        request.name,
        request.arguments ?? {},
      );
      return { content };
    } catch (err) {
      this.logger.warn(
        `MCP tool ${request.serverId}/${request.name} failed: ${err}`,
      );
      return {
        isError: true,
        content: [
          {
            type: 'text',
            text: err instanceof Error ? err.message : String(err),
          },
        ],
      };
    }
  }

  async readResource(
    serverId: string,
    uri: string,
  ): Promise<McpContentBlock[]> {
    if (serverId === this.local.id) {
      const { text, mimeType } = await this.local.readResource(uri);
      return [{ type: 'resource', resource: { uri, mimeType, text } }];
    }
    return this.client.readResource(serverId, uri);
  }

  /**
   * Lightweight chat handler. If the message looks like a direct tool
   * invocation (or one was supplied explicitly) we run it; otherwise we
   * answer with a list of suggested tools so the UI can render buttons.
   * This is intentionally NOT a full LLM loop — it's a deterministic
   * preview that any frontend can drive without an API key.
   */
  async chat(request: McpChatRequest): Promise<McpChatResponse> {
    const inventory = this.inventory();
    const message = request.message?.trim() ?? '';

    if (request.toolCall) {
      const result = await this.invokeTool(request.toolCall);
      return {
        reply: this.toolMessage(request.toolCall, result),
      };
    }

    const matchedTool = this.matchTool(message, inventory.tools);
    if (matchedTool) {
      const call: McpToolInvocationRequest = {
        serverId: matchedTool.serverId,
        name: matchedTool.name,
        arguments: this.extractArgs(message, matchedTool),
      };
      const result = await this.invokeTool(call);
      return { reply: this.toolMessage(call, result) };
    }

    return {
      reply: {
        id: this.uuid(),
        role: 'assistant',
        text:
          inventory.tools.length === 0
            ? 'No MCP tools are registered yet. Configure MCP_CLIENT_REMOTES or add tools to the local server.'
            : `I can run ${inventory.tools.length} MCP tool(s). Try one of the suggestions below.`,
        createdAt: new Date().toISOString(),
      },
      suggestedTools: inventory.tools.slice(0, 5),
    };
  }

  private matchTool(
    message: string,
    tools: McpToolSummary[],
  ): McpToolSummary | undefined {
    if (!message) return undefined;
    const lower = message.toLowerCase();
    const exact = tools.find((t) => lower.startsWith(`/${t.name}`));
    if (exact) return exact;

    if (/\b(list|all)\b.*\busers?\b/.test(lower)) {
      return tools.find((t) => t.name === 'list-users');
    }
    if (/\b(get|find|show|lookup)\b.*\buser\b/.test(lower)) {
      return tools.find((t) => t.name === 'get-user');
    }
    return undefined;
  }

  private extractArgs(
    message: string,
    tool: McpToolSummary,
  ): Record<string, unknown> {
    if (tool.name === 'list-users') {
      const m = message.match(/\b(\d{1,3})\b/);
      return m ? { limit: Number(m[1]) } : {};
    }
    if (tool.name === 'get-user') {
      const slash = message.match(/^\/get-user\s+(\S+)/i);
      if (slash) return { username: slash[1] };
      const named = message.match(/user(?:name)?\s+(?:is\s+)?([A-Za-z0-9_]+)/i);
      if (named) return { username: named[1] };
      const trailing = message.match(/([A-Za-z0-9_]{2,})\s*$/);
      if (trailing) return { username: trailing[1] };
    }
    return {};
  }

  private toolMessage(
    call: McpToolInvocationRequest,
    result: McpToolInvocationResponse,
  ): McpChatMessage {
    const text = result.content
      .map((c) => {
        if (c.type === 'text') return c.text;
        if (c.type === 'resource') return c.resource.text ?? c.resource.uri;
        return '[non-text content]';
      })
      .join('\n');
    return {
      id: this.uuid(),
      role: 'tool',
      text: result.isError ? `Tool error: ${text}` : text,
      toolCall: call,
      toolResult: result,
      createdAt: new Date().toISOString(),
    };
  }

  private uuid(): string {
    return (
      globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)
    );
  }
}
