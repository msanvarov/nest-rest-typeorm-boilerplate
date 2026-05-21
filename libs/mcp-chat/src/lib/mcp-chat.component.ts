import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import {
  McpChatMessage,
  McpInventory,
  McpToolSummary,
} from '@starter/mcp-types';

import { McpChatService } from './mcp-chat.service';

@Component({
  selector: 'starter-mcp-chat',
  standalone: true,
  templateUrl: './mcp-chat.component.html',
  styleUrls: ['./mcp-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
  ],
})
export class McpChatComponent implements OnInit {
  readonly inventory = signal<McpInventory | null>(null);
  readonly messages = signal<McpChatMessage[]>([]);
  readonly busy = signal(false);
  readonly error = signal<string | null>(null);
  draft = '';

  constructor(
    private readonly mcp: McpChatService,
    private readonly cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.refreshInventory();
  }

  refreshInventory(): void {
    this.mcp.inventory().subscribe({
      next: (inv) => {
        this.inventory.set(inv);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error.set(this.errorText(err));
        this.cdr.markForCheck();
      },
    });
  }

  trackMessage(_: number, m: McpChatMessage): string {
    return m.id;
  }

  trackTool(_: number, t: McpToolSummary): string {
    return `${t.serverId}::${t.name}`;
  }

  send(): void {
    const text = this.draft.trim();
    if (!text || this.busy()) return;

    const userMsg: McpChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text,
      createdAt: new Date().toISOString(),
    };
    this.appendMessage(userMsg);
    this.draft = '';
    this.busy.set(true);
    this.error.set(null);

    this.mcp.chat({ message: text, history: this.messages() }).subscribe({
      next: (res) => {
        this.appendMessage(res.reply);
        this.busy.set(false);
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.busy.set(false);
        this.error.set(this.errorText(err));
        this.cdr.markForCheck();
      },
    });
  }

  runTool(tool: McpToolSummary): void {
    if (this.busy()) return;
    this.busy.set(true);
    this.error.set(null);

    const placeholder: McpChatMessage = {
      id: crypto.randomUUID(),
      role: 'user',
      text: `Run tool: ${tool.serverId}/${tool.name}`,
      createdAt: new Date().toISOString(),
    };
    this.appendMessage(placeholder);

    this.mcp
      .chat({
        message: '',
        toolCall: {
          serverId: tool.serverId,
          name: tool.name,
          arguments: {},
        },
      })
      .subscribe({
        next: (res) => {
          this.appendMessage(res.reply);
          this.busy.set(false);
          this.cdr.markForCheck();
        },
        error: (err) => {
          this.busy.set(false);
          this.error.set(this.errorText(err));
          this.cdr.markForCheck();
        },
      });
  }

  clear(): void {
    this.messages.set([]);
  }

  private appendMessage(m: McpChatMessage): void {
    this.messages.update((prev) => [...prev, m]);
  }

  private errorText(err: unknown): string {
    if (err instanceof Error) return err.message;
    if (typeof err === 'object' && err && 'message' in err) {
      return String((err as { message: unknown }).message);
    }
    return String(err);
  }
}
