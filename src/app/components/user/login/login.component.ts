import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/service/auth.service';

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

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              public _authService: AuthService) { }

  ngOnInit() {
  }

  public onLogin(): void {
    this._authService.loginEmailUser( this.email, this.password )
      .then( res => {
        console.log('Logeado por correo: ', res);
        this.isError = false;
        this.onLoginRedirect();
      }).catch( error => {
        console.log('Error al iniciar sesion por correo', error.message);
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
        this.errorMes = 'Correo o Password incorrectos';
      });
  }

  onLoginFacebook() {}

  onLoginGoogle() {}

  public onLoginRedirect() {
    this.router.navigate(['inicio']);
  }

}
