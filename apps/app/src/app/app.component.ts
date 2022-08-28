import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { IMessage } from '@starter/api-types';

@Component({
  selector: 'starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<IMessage>('/api/hello');
  constructor(private http: HttpClient) {}

  public isAuthenticated = false;

  public logout(): void {
    // todo
  }
}
