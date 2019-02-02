/**
 * @fileoverview AuthService, este servicio muestra diferentes metodos para poder
 * logearnos y registrarnos en la base de datos de firebase, hace tambien peticiones
 * a la base de datos para determinar si estamos logeados
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento diferentes metodos para iniciar sesion, registro y saber si esta logeado
 *
 * La primara version de AuthService fue escrita por Eduardo May
*/

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afService: AngularFireAuth,
    private aFirestore: AngularFirestore) { }

  /**
   * registrar directamente a la base de datos
  */
  public registerUser(email: string, password: string) {
    return new Promise( (resolve, reject) => {
      this._afService.auth.createUserWithEmailAndPassword(email, password)
        .then( userData => {
          resolve(userData);
          this.updateUserData(userData.user);
        }).catch( err => reject(err));
    });
  }

  /**
   * login con correo y contraseña
  */
  public loginEmailUser(email: string, password: string) {
    return new Promise( (resolve, reject) => {
      this._afService.auth.signInWithEmailAndPassword(email, password)
        .then( userData => resolve(userData), err => reject(err));
    });
  }

  /**
   * login con facebook
  */
  public loginFacebook() {
    return this._afService.auth.signInWithPopup( new auth.FacebookAuthProvider() )
      .then( credential => {
        this.updateUserData(credential.user);
      });
  }

  /**
   * login con google
  */
  public loginGoogle() {
    return this._afService.auth.signInWithPopup( new auth.GoogleAuthProvider() )
      .then( credential => {
        this.updateUserData(credential.user);
      });
  }

  /**
   * cerrar sesion de cualquier metodo de inicio de sesion
  */
  public logoutUser() {
    return this._afService.auth.signOut();
  }

  /**
   * conocer el estatus del usuario logeado
  */
  public isAuth() {
    return this._afService.authState.pipe( map( isAuth => isAuth));
  }

  /**
   * actualiza la informacion del usuario
  */
  public updateUserData( user ) {
    const userRef: AngularFirestoreDocument<any> = this.aFirestore.doc(`users/${user.uid}`);
    const data: UserInterface = {
      id: user.uid,
      email: user.email,
      roles: {
        usuario: true
      }
    };

    return userRef.set(data, {merge: true});
  }

  /**
   * obtiene el registro de un usuario
  */
  public isUserAdmin( userUid: string ) {
    return this.aFirestore.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
}
