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
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { UserInterface } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  public users: Observable<UserInterface[]>;
  private usersDoc: AngularFirestoreDocument<UserInterface>;
  private user: Observable<UserInterface>;

  constructor(private _afService: AngularFireAuth,
    private aFirestore: AngularFirestore) {
      this.usersCollection = this.aFirestore.collection<UserInterface>('users');
      this.users = this.usersCollection.valueChanges();
    }

  /**
   * obtner el usuario actual
  */
  public getCurrentUser(idUser: string) {
    this.usersDoc = this.aFirestore.doc<UserInterface>(`users/${idUser}`);
    return this.user = this.usersDoc.snapshotChanges().pipe( map( action => {
      if ( action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as UserInterface;
        data.id = action.payload.id;
        return data;
      }
    }));
  }

  /**
   * registrar directamente a la base de datos
  */
  public registerUser(email: string, password: string, name: string) {
    return new Promise( (resolve, reject) => {
      this._afService.auth.createUserWithEmailAndPassword(email, password)
        .then( userData => {
          resolve(userData);
          this.updateUserData(userData.user, name);
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
    return this._afService.auth.signInWithPopup( new auth.FacebookAuthProvider() );
  }

  /**
   * registro con facebook
  */
  public registerFacebook() {
    return this._afService.auth.signInWithPopup( new auth.FacebookAuthProvider() )
      .then( credential => {
        this.updateUserData(credential.user, null);
      });
  }

  /**
   * login con google
  */
  public loginGoogle() {
    return this._afService.auth.signInWithPopup( new auth.GoogleAuthProvider() );
  }

  /**
   * login con google
  */
  public registerGoogle() {
    return this._afService.auth.signInWithPopup( new auth.GoogleAuthProvider() )
      .then( credential => {
        this.updateUserData(credential.user, null);
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
  public updateUserData( user, newName: string ) {
    const userRef: AngularFirestoreDocument<any> = this.aFirestore.doc(`users/${user.uid}`);
    if (newName === null) {
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        roles: {
          miembro: true
        }
      };

      return userRef.set(data, {merge: true});
    } else {
      const data: UserInterface = {
        id: user.uid,
        email: user.email,
        name: newName,
        roles: {
          miembro: true
        }
      };

      return userRef.set(data, {merge: true});
    }
  }

  /**
   * actualiza el nombre del usuario
  */
  public updateUserName( userUid: string, name: string ) {
    const userRef: AngularFirestoreDocument<any> = this.aFirestore.doc(`users/${userUid}`);
    const data: UserInterface = {
      name: name,
    };

    return userRef.set(data, {merge: true});
  }

  /**
   * guardar url en el database
  */
  public updateProfileUrl(userUid: string, photoUrl: any, idPhoto: string) {
    if ( idPhoto === null ) {
      const userRef: AngularFirestoreDocument<any> = this.aFirestore.doc(`users/${userUid}`);
      const data: UserInterface = {
        photoUrl: photoUrl
      };

      return userRef.set(data, {merge: true});
    } else {
      const userRef: AngularFirestoreDocument<any> = this.aFirestore.doc(`users/${userUid}`);
      const data: UserInterface = {
        photoUrl: photoUrl,
        idPhoto: idPhoto
      };

      return userRef.set(data, {merge: true});
    }
  }


  /**
   * obtiene el registro de un usuario
  */
  public isUserAdmin( userUid: string ) {
    return this.aFirestore.doc<UserInterface>(`users/${userUid}`).valueChanges();
  }
}
