/**
 * Types shared across the MCP module's services.
 */

export interface McpToolSummary {
  name: string;
  description?: string;
  inputSchema?: Record<string, unknown>;
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
  | {
      type: 'resource';
      resource: { uri: string; mimeType?: string; text?: string };
    };

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
  text: string;
  toolCall?: McpToolInvocationRequest;
  toolResult?: McpToolInvocationResponse;
  createdAt: string;
}

export interface McpChatRequest {
  message: string;
  toolCall?: McpToolInvocationRequest;
  history?: McpChatMessage[];
}

export interface McpChatResponse {
  reply: McpChatMessage;
  suggestedTools?: McpToolSummary[];
}
