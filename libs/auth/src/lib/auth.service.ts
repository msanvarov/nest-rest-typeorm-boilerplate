import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, tap } from 'rxjs';

import {
  ApiAuthRoutesEnum,
  IAuthRegisterPayload,
  IJWTResponseBody,
  IUser,
} from '@starter/api-types';
import { Store } from '@starter/store';
import { UsersService } from '@starter/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private store: Store,
    private http: HttpClient,
    private router: Router,
    private usersService: UsersService,
  ) {}

  get user() {
    return this.store.get<IUser>('user');
  }

  get isAuthenticated() {
    return this.user !== undefined;
  }

  loginUser(username: string, password: string) {
    return this.http
      .post(ApiAuthRoutesEnum.LOGIN, {
        username,
        password,
      })
      .pipe(
        mergeMap((user) =>
          this.usersService.getAuthenticatedUserDetails(
            (user as IJWTResponseBody).token,
          ),
        ),
        tap((user) => {
          this.store.set('user', user);
        }),
      );
  }

  registerUser(registerPayload: IAuthRegisterPayload) {
    return this.http.post(ApiAuthRoutesEnum.REGISTER, registerPayload).pipe(
      mergeMap((user) =>
        this.usersService.getAuthenticatedUserDetails(
          (user as IJWTResponseBody).token,
        ),
      ),
      tap((user) => {
        this.store.set('user', user);
      }),
    );
  }

  logoutUser() {
    this.store.set('user', undefined);
    return this.router.navigate(['/auth/login']);
  }
}
