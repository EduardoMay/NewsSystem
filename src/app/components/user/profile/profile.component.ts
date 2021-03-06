/**
 * @fileoverview ProfileComponent, metodos para poder poder obtener los datos de la persona
 * logeado, tambien se declaran metodos para poder actualizar su foto de perfil
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento diferentes metodos para obtener datos y actualizar foto de perfil
 *
 * La primara version de ProfileComponent fue escrita por Eduardo May
*/

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public divUpdatePhoto = false; // true: poder mostrar la caja para poder subir la imagen
  public alertMessage = ''; // alerta de mensage
  public alertAct = false; // true: se muestra la alerta
  public user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  }; // datos de la persona logeada
  public userUid = null;
  public providerId = 'null'; // id del perfil
  public provider = 'null'; // proveedor del usuario
  public tipoUser: any = null; // tipo de usuario

  public userAuth: UserInterface = {}; // data del usuario sacado de la BD de firebase
  public uploadPercent: Observable<number>; // pocentaje de la subida de la imagen
  public urlImage: Observable<string>; // url de la imagen donde se guarda en la base de datos
  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(private _authService: AuthService,
              private angStorage: AngularFireStorage) { }

  ngOnInit() {
    this.dataUser();
    this.getCurrentUser();
  }

  /**
   * Obtiene las propiedades del perfil
  */
  public dataUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        this.getCurrentDataUser(userData.uid);
        this.user.name = userData.displayName;
        // this.username = userData.displayName;
        this.user.email = userData.email;
        this._authService.getCurrentUser(userData.uid).subscribe( data => {
          this.user.photoUrl = data.photoUrl;
        });
        this.providerId = userData.providerData[0].providerId;
        this.providerUser(this.providerId);
        // console.log('Datos del usuario: ', userData);
        // console.log('Datos del usuario: ', this.providerId);
      }
    });
  }

  /**
   * obtener la infomacion del usuario
  */
  public getCurrentDataUser(id: string) {
    this._authService.getCurrentUser(id).subscribe( userData => {
      this.userAuth = userData;
    });
  }

  /**
   * saber el proveedor del usuario, en que plataforma se logeo
  */
  public providerUser( providerId: string ) {
    if ( providerId === 'password') {
      this.provider = 'Correo y contraseña';
    } else if ( providerId === 'facebook.com') {
      this.provider = 'Facebook';
    } else if ( providerId === 'google.com') {
      this.provider = 'Google';
    }
  }

  /**
   * se observa si el usuario esta autentificado y el rol que tiene
  */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( auth => {
      if (auth) {
        this.userUid = auth.uid;
        // console.log(this.userUid);
        this._authService.isUserAdmin( this.userUid ).subscribe( userRole => {
          this.tipoUser = Object.assign({}, userRole.roles);
          if ( this.tipoUser.miembro ) {
            // console.log('miembro');
            this.tipoUser = 'Miembro';
          } else if ( this.tipoUser.editor ) {
            // console.log('editor');
            this.tipoUser = 'Editor';
          } else if ( this.tipoUser.admin ) {
            // console.log('Administrador');
            this.tipoUser = 'Administrador';
          }
        });
      }
    });
  }
}
