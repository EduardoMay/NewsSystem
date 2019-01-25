import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afService: AngularFireAuth) { }

  public registerUser(email: string, password: string) {
    return new Promise( (resolve, reject) => {
      this._afService.auth.createUserWithEmailAndPassword(email, password)
        .then( userData => resolve(userData), err => reject(err));
    });
  }

  public loginEmailUser(email: string, password: string) {
    return new Promise( (resolve, reject) => {
      this._afService.auth.signInWithEmailAndPassword(email, password)
        .then( userData => resolve(userData), err => reject(err));
    });
  }

  public loginFacebook() {
    return this._afService.auth.signInWithPopup( new auth.FacebookAuthProvider() );
  }

  public loginGoogle() {}

  public logoutUser() {
    return this._afService.auth.signOut();
  }

  public isAuth() {
    return this._afService.authState.pipe( map( isAuth => isAuth));
  }
}
