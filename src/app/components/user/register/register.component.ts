/**
 * @fileoverview RegisterComponent, se emplean el metodo para registrar un usuario por
 * medio del correo y una contraseña, la contraseña no se guarda en la base de datos
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implementa el metodo de registro
 *
 * La primara version de RegisterComponent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public name = ''; // nombre
  public email = ''; // correo a registra
  public password = ''; // contraseña

  constructor(private _authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  /**
   * registro de usuario
   */
  public onRegister() {
    this._authService.registerUser(this.email, this.password, this.name)
      .then( res => {
        this._authService.isAuth().subscribe( userData => {
          if ( userData ) {
            userData.updateProfile( {displayName: this.name, photoURL: null} ).then( () => {
            });
          }
        });
        this.router.navigate(['inicio']);
      }).catch( err => console.log('Error al registrarte:', err.message));
  }

  /**
   * login con facebook
   */
  public onRegisterFacebook() {
    this._authService.registerFacebook()
      .then( res => {
        // usar lo mismo que en la linea 41
        console.log('Usuario logeado con facebook');
        this._authService.isAuth().subscribe( userData => {
          if ( userData ) {
            this._authService.updateProfileUrl(userData.uid, userData.photoURL);
          }
        });
        this.onLoginRedirect();
      }).catch( err => {
        console.log('Error al iniciar sesion facebook', err.message);
      });
  }

  /**
   * login con google
   */
  public onRegisterGoogle() {
    this._authService.registerGoogle()
      .then( res => {
        console.log('Usuario logeado con google');
        this._authService.isAuth().subscribe( userData => {
          if ( userData ) {
            this._authService.updateProfileUrl(userData.uid, userData.photoURL);
          }
        });
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
