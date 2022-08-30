import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiUsersRoutesEnum, IUser } from '@starter/api-types';
import { Store } from '@starter/store';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private store: Store) {}

  getAuthenticatedUserDetails(token: string) {
    // fetching user token from store
    return this.http.get<IUser>(ApiUsersRoutesEnum.GET_USER, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}
