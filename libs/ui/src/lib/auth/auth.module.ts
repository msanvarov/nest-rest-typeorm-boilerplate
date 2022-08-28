import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  providers: [],
  declarations: [],
})
export class AuthModule {}
