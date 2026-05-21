import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'starter-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false,
})
export class RegisterComponent {
  isRegisterFormValid = true;
  email = '';
  username = '';
  name = '';
  password = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  onSubmit(): void {
    this.isRegisterFormValid = true;
    this.authService
      .registerUser({
        name: this.name,
        username: this.username,
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          this.isRegisterFormValid = true;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          this.isRegisterFormValid = false;
        },
      });
  }
}
