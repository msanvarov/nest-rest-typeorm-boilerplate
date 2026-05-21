import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, mergeMap, tap } from 'rxjs';

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
    private readonly store: Store,
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly usersService: UsersService,
  ) {}

  get user(): Observable<IUser | undefined> {
    return this.store.get<IUser>('user');
  }

  get isAuthenticated(): boolean {
    return Boolean((this.store.value as { user?: IUser }).user);
  }

  loginUser(
    username: string,
    password: string,
  ): Observable<IUser> {
    return this.http
      .post<IJWTResponseBody>(ApiAuthRoutesEnum.LOGIN, { username, password })
      .pipe(
        mergeMap((res) =>
          this.usersService.getAuthenticatedUserDetails(res.token),
        ),
        tap((user) => this.store.set('user', user)),
      );
  }

  registerUser(payload: IAuthRegisterPayload): Observable<IUser> {
    return this.http
      .post<IJWTResponseBody>(ApiAuthRoutesEnum.REGISTER, payload)
      .pipe(
        mergeMap((res) =>
          this.usersService.getAuthenticatedUserDetails(res.token),
        ),
        tap((user) => this.store.set('user', user)),
      );
  }

  logoutUser(): Promise<boolean> {
    this.store.set('user', undefined);
    return this.router.navigate(['/auth/login']);
  }
}
