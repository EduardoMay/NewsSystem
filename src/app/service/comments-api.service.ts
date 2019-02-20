/**
 * @fileoverview ComentsApiService, en este servicio se implementa varios metodos para poder guardar
 * comentarios de un asuario
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento guardar comentario del usuario, obtener todos los comentarios y eliminar comentarios
 *
 * La primara version de ComentsApiService fue escrita por Eduardo May
*/

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CommentsInterface } from '../models/comments';

@Injectable({
  providedIn: 'root'
})
export class CommentsApiService {

  private commentsCollection: AngularFirestoreCollection<CommentsInterface>;
  public comments: Observable<CommentsInterface[]>;
  private commentsDoc: AngularFirestoreDocument<CommentsInterface>;
  public comment: Observable<CommentsInterface>;

  constructor(private angularFirestore: AngularFirestore) {
    this.commentsCollection = this.angularFirestore.collection<CommentsInterface>('comments', ref => ref.orderBy('fecha', 'desc'));
    this.comments = this.commentsCollection.valueChanges();
  }

  /**
   * agregar comentario
  */
  public addComment(comment: CommentsInterface): void {
    this.commentsCollection.add(comment);
  }

  /**
   * obtener todo los comentarios
  */
  public getAllComments() {
    return this.comments = this.commentsCollection.snapshotChanges()
      .pipe( map( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as CommentsInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }
}
