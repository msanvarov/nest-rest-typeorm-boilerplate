import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from '@starter/auth';
import { UsersService } from '@starter/users';

import { DashboardComponent } from './dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        component: DashboardComponent,
      },
    ]),
  ],
  providers: [AuthGuard, UsersService],
})
export class DashboardModule {}
