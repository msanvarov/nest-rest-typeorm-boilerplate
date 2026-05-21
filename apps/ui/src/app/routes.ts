import { Routes } from '@angular/router';

export const GlobalRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  {
    path: 'mcp',
    loadChildren: () =>
      import('@starter/mcp-chat').then((m) => m.McpChatModule),
  },
];
