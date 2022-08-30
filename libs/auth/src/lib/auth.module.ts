import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Store } from '@starter/store';
import { UsersService } from '@starter/users';

import { AuthService } from './auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule.forChild([
      {
        path: 'auth',
        children: [
          { path: '', pathMatch: 'full', redirectTo: 'login' },
          {
            path: 'login',
            loadChildren: () =>
              import('./login/login.module').then(
                (loginModule) => loginModule.LoginModule,
              ),
          },
          {
            path: 'register',
            loadChildren: () =>
              import('./register/register.module').then(
                (registerModule) => registerModule.RegisterModule,
              ),
          },
        ],
      },
    ]),
  ],
  providers: [Store, AuthService, UsersService],
  declarations: [],
})
export class AuthModule {}
