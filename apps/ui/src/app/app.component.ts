import { Component } from '@angular/core';

import { AuthService } from '@starter/auth';

@Component({
  selector: 'starter-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor(private readonly authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  logout(): void {
    this.authService.logoutUser();
  }
}
