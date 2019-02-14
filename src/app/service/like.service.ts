/**
 * @fileoverview LikeService, en este servicio se implementa varios metodos para poder guardar
 * el like de un asuario
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento guardar like del usuario, obtener todos los like y eliminar like
 *
 * La primara version de LikeService fue escrita por Eduardo May
*/

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LikeInterface } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private likesCollection: AngularFirestoreCollection<LikeInterface>;
  public likes: Observable<LikeInterface[]>;
  private likesDoc: AngularFirestoreDocument<LikeInterface>;
  public like: Observable<LikeInterface>;

  constructor(private angularFirestore: AngularFirestore) {
    this.likesCollection = this.angularFirestore.collection<LikeInterface>('likes');
    this.likes = this.likesCollection.valueChanges();
  }

  /**
   * Agragar like
  */
  public addLike(likeNew: LikeInterface): void {
    this.likesCollection.add(likeNew);
  }

  /**
   * obtener todos los likes
  */
  public getAllLikes() {
    return this.likes = this.likesCollection.snapshotChanges()
      .pipe( map( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as LikeInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  /**
   * eliminar like
  */
  public deleteLike(idLike: string) {
    this.likesDoc = this.angularFirestore.doc<any>(`likes/${idLike}`);
    this.likesDoc.delete();
  }
}
