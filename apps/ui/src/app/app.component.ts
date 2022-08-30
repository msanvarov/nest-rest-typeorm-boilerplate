import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { IMessage } from '@starter/api-types';
import { AuthService } from '@starter/auth';

@Component({
  selector: 'starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<IMessage>('/api/hello');
  constructor(private http: HttpClient, private authService: AuthService) {}

  public isAuthenticated = this.authService.isAuthenticated;

  public logout(): void {
    this.authService.logoutUser();
  }
}
