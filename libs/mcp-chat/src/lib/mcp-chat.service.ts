import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  McpChatRequest,
  McpChatResponse,
  McpInventory,
  McpToolInvocationRequest,
  McpToolInvocationResponse,
} from '@starter/mcp-types';

const BASE = '/api/v1/mcp';

@Injectable({ providedIn: 'root' })
export class McpChatService {
  constructor(private readonly http: HttpClient) {}

  inventory(): Observable<McpInventory> {
    return this.http.get<McpInventory>(`${BASE}/inventory`);
  }

  chat(request: McpChatRequest): Observable<McpChatResponse> {
    return this.http.post<McpChatResponse>(`${BASE}/chat`, request);
  }

  invoke(
    request: McpToolInvocationRequest,
  ): Observable<McpToolInvocationResponse> {
    return this.http.post<McpToolInvocationResponse>(
      `${BASE}/invoke`,
      request,
    );
  }
}
