/**
 * @fileoverview LoginComponent, metodos para poder logearnos por medio del
 * correo, google y facebook
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento diferentes metodos para iniciar sesion
 *
 * La primara version de LoginComponent fue escrita por Eduardo May
*/

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

  public email = ''; // constante donde se guarda el correo del formulario
  public password = ''; // constante donde se guarda la contraseña del formulario
  public isError = false; // constante boolean donde se registra si hay error
  public errorMes = ''; // guarda mensaje de error

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              public _authService: AuthService) { }

  ngOnInit() {
  }

  /**
   * Logearse son correo y contraseña
  */
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

  /**
   * logearse con facebook
  */
  public onLoginFacebook() {
    this._authService.loginFacebook()
      .then( res => {
        console.log('Usuario logeado con facebook');
        this.onLoginRedirect();
      }).catch( err => {
        console.log('Error al iniciar sesion facebook', err.message);
      });
  }

  /**
   * logearse con google
  */
  public onLoginGoogle() {
    this._authService.loginGoogle()
      .then( res => {
        console.log('Usuario logeado con google');
        this.onLoginRedirect();
      }).catch( err => {
        console.log('Error al iniciar sesion con google');
      });
  }

  /**
   * redireccionar al iniciao
  */
  public onLoginRedirect() {
    this.router.navigate(['inicio']);
  }

}
