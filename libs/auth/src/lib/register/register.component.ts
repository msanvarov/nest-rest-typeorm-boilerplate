import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'starter-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  isRegisterFormValid = true;
  email = '';
  username = '';
  name = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

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
        next: (_) => {
          this.isRegisterFormValid = true;
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert(err.message);
          this.isRegisterFormValid = false;
        },
      });
  }
}
