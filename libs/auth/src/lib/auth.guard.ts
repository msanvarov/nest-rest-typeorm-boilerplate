import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.user.pipe(
      map((user) => {
        console.log('User', user);
        if (!user) {
          this.router.navigate(['/auth/login']);
        }
        return !!user;
      }),
    );
  }
}
