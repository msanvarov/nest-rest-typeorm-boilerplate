import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Store } from '@starter/store';
import { UsersService } from '@starter/users';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: 'auth',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'login' },
          {
            path: 'login',
            loadChildren: () =>
              import('./login/login.module').then((m) => m.LoginModule),
          },
          {
            path: 'register',
            loadChildren: () =>
              import('./register/register.module').then(
                (m) => m.RegisterModule,
              ),
          },
        ],
      },
    ]),
  ],
  providers: [Store, AuthService, UsersService],
})
export class AuthModule {}
