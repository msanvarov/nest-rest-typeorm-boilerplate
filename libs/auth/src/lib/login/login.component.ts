import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoginFormValid = true;
  username = '';
  password = '';
  loading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.loading = true;
    this.isLoginFormValid = true;
    this.authService.loginUser(this.username, this.password).subscribe({
      next: (_) => {
        this.loading = false;
        this.isLoginFormValid = true;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        console.error(err);
        alert(err.message);
        this.isLoginFormValid = false;
      },
    });
  }
}
