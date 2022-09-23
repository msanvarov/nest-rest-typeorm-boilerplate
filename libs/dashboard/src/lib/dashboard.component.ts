import { Component } from '@angular/core';

import { AuthService } from '@starter/auth';

@Component({
  selector: 'starter-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [],
})
export class DashboardComponent {
  user$ = this.authService.user;
  constructor(private authService: AuthService) {}
}
