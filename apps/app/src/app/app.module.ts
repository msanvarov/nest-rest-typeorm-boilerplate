import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AuthModule, MaterialModule } from '@starter/ui';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { GlobalRoutes } from './routes';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
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
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
