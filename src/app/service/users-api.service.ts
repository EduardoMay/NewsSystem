/**
 * @fileoverview UsersApiService, en este servicio se podra realizar
 * diferentes metodos para poder obtener todos los usuarios
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0
 *
 * La primara version de UsersApiService fue escrita por Eduardo May
*/

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserInterface } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {

  private usersCollection: AngularFirestoreCollection<UserInterface>;
  public users: Observable<UserInterface[]>;
  private usersDoc: AngularFirestoreDocument<UserInterface>;
  public selectedUser: UserInterface = {};

  constructor(private angularFirestore: AngularFirestore) {
    this.usersCollection = this.angularFirestore.collection<UserInterface>('users');
    this.users = this.usersCollection.valueChanges();
  }

  /**
   * obtener todos los usuarios
  */
  public getAllUsers() {
    return this.users = this.usersCollection.snapshotChanges()
      .pipe( map ( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data();
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
}
