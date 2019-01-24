import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public email = '';
  public password = '';

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  public onRegister() {
    this._authService.registerUser(this.email, this.password)
      .then( res => {
        this.router.navigate(['inicio']);
      }).catch( err => console.log('Error al registrarte:', err.message));
  }

  public onLoginFacebook() {}

  public onLoginGoogle() {}

}
