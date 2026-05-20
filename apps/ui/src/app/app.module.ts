import { CommonModule } from '@angular/common';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AuthModule, AuthService } from '@starter/auth';
import { DashboardModule } from '@starter/dashboard';
import { MaterialModule } from '@starter/material-design';

import { AppComponent } from './app.component';
import { GlobalRoutes } from './routes';

@NgModule({
  declarations: [AppComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(GlobalRoutes, {
      initialNavigation: 'enabledBlocking',
    }),
    AuthModule,
    DashboardModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
