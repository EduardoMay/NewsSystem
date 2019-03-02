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
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public statusLogin = false; // estatus del usuario
  public currentUser = {
    name: '',
    photo: '',
    status: false
  };
  public dataUser: UserInterface = {}; // obtener la informacion del usario sacado desde la base de datos de firebase

  constructor(private afAuth: AngularFireAuth,
    private _authService: AuthService,
    private router: Router) { }

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
        this.getCurrentDataUser(auth.uid);
        this.statusLogin = true;
        // this.currentUser.name = auth.displayName;
        this.currentUser.photo = auth.photoURL;
        this.currentUser.status = true;
      } else {
        console.log('Usuario no logeado');
        this.statusLogin = false;
      }
    });
  }

  /**
   * obtener la infomacion del usuario
  */
  public getCurrentDataUser(id: string) {
  this._authService.getCurrentUser(id).subscribe( userData => {
    this.dataUser = userData;
  });
}

  /**
   * cerrar sesion
  */
  public onLogout() {
    this._authService.logoutUser();
    this.currentUser.status = false;
    this.router.navigate(['/']);
    // window.location.reload();
  }

}
