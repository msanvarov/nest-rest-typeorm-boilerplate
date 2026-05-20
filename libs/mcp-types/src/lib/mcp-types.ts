/**
 * Types shared between the API's MCP module and the Angular chat preview.
 * Mirrors the subset of the Model Context Protocol surface that the UI cares
 * about, without leaking the full SDK shape into the browser bundle.
 */

export interface McpToolSummary {
  name: string;
  description?: string;
  /** JSON Schema for the tool's input. */
  inputSchema?: Record<string, unknown>;
  /** Identifier for the MCP server that exposes this tool. */
  serverId: string;
}

export interface McpResourceSummary {
  uri: string;
  name?: string;
  description?: string;
  mimeType?: string;
  serverId: string;
}

export interface McpPromptSummary {
  name: string;
  description?: string;
  arguments?: Array<{
    name: string;
    description?: string;
    required?: boolean;
  }>;
  serverId: string;
}

export interface McpServerInfo {
  id: string;
  name: string;
  version?: string;
  /** "local" = the API's own server; "remote" = an external MCP endpoint. */
  kind: 'local' | 'remote';
  endpoint?: string;
  connected: boolean;
}

export interface McpInventory {
  servers: McpServerInfo[];
  tools: McpToolSummary[];
  resources: McpResourceSummary[];
  prompts: McpPromptSummary[];
}

export type McpContentBlock =
  | { type: 'text'; text: string }
  | { type: 'image'; data: string; mimeType: string }
  | { type: 'resource'; resource: { uri: string; mimeType?: string; text?: string } };

export interface McpToolInvocationRequest {
  serverId: string;
  name: string;
  arguments?: Record<string, unknown>;
}

export interface McpToolInvocationResponse {
  isError?: boolean;
  content: McpContentBlock[];
}

export interface McpChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'tool';
  /** Free-form text. For tool messages this is the rendered result. */
  text: string;
  /** Populated when the assistant proposes a tool call. */
  toolCall?: McpToolInvocationRequest;
  /** Populated when the message represents a completed tool result. */
  toolResult?: McpToolInvocationResponse;
  createdAt: string;
}

export interface McpChatRequest {
  message: string;
  /** Optional explicit tool invocation. When set, the API runs the tool and returns its result. */
  toolCall?: McpToolInvocationRequest;
  history?: McpChatMessage[];
}

export interface McpChatResponse {
  reply: McpChatMessage;
  suggestedTools?: McpToolSummary[];
}
