import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { McpChatComponent } from './mcp-chat.component';

@NgModule({
  imports: [
    McpChatComponent,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: McpChatComponent },
    ]),
  ],
})
export class McpChatModule {}
