import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

import { Message } from '@starter/api-types';

@Component({
  selector: 'starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  constructor(private http: HttpClient) {}
}
