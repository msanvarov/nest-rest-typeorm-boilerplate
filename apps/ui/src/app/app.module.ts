import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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

    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AuthModule,
    DashboardModule,
    MaterialModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
