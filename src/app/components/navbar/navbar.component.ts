/**
 * @fileoverview NavbarComponent, se crean metodos para determinar si el usuario esta logeado
 * y mostrar mas opciones
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se obtiene el estatus del usuario
 *
 * La primara version de NavbarComponent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public statusLogin = false; // estatus del usuario

  constructor(private afAuth: AngularFireAuth, private _authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  /**
   * con el servicio isAuth() se obtiene si el usuario esta logeado
   */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('Usuario logeado');
        this.statusLogin = true;
      } else {
        console.log('Usuario no logeado');
        this.statusLogin = false;
      }
    });
  }

  /**
   * cerrar sesion
  */
  public onLogout() {
    this._authService.logoutUser();
  }

}
