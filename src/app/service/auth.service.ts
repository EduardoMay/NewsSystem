import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _afService: AngularFireAuth) { }

  public registerUser() {}

  public loginEmailUser(email: string, password: string) {
    return new Promise( (resolve, reject) => {
      this._afService.auth.signInWithEmailAndPassword(email, password)
        .then( userData => resolve(userData), err => reject(err));
    });
  }

  public loginFacebook() {}

  public loginGoogle() {}

  public logoutUser() {}

  public isAuth() {}
}
