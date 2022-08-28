import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'starter-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerFormIsValid = true;
  username = '';
  name = '';
  password = '';
  constructor() {}

  ngOnInit(): void {}

  onSubmit(): void {}
}
