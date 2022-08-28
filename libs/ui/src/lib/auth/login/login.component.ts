import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'starter-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginValid = true;
  public username = '';
  public password = '';

  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
