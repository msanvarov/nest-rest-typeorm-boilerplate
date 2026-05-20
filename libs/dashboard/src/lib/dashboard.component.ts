import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { IUser } from '@starter/api-types';
import { AuthService } from '@starter/auth';

@Component({
  selector: 'starter-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [],
  standalone: false,
})
export class DashboardComponent {
  user$: Observable<IUser | undefined>;

  constructor(private readonly authService: AuthService) {
    this.user$ = this.authService.user;
  }
}
