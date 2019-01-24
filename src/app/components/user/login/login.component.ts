import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email;
  public password;
  public isError = false;
  public errorMes = '';

  constructor() { }

  ngOnInit() {
  }

  onLogin() {}

  onLoginFacebook() {}

  onLoginGoogle() {}

}
