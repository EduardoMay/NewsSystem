/**
 * @fileoverview CommentsPageApiService, se implementaran metodos para enviar comentarios de la pagina
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento guardar comentario del usuario
 *
 * La primara version de CommentsPageApiService fse implementaran metodos para enviar comentarios de la pagina
*/

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { CommentPagInterface } from '../models/commentPag';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsPageApiService {

  private commentsPageCollection: AngularFirestoreCollection<CommentPagInterface>;
  public commentsPage: Observable<CommentPagInterface[]>;

  constructor(private angularFirestore: AngularFirestore) {
    this.commentsPageCollection = this.angularFirestore.collection<CommentPagInterface>('commentsPage', ref => ref.orderBy('date', 'desc'));
    this.commentsPage = this.commentsPageCollection.valueChanges();
  }

  /**
   * guardar comentario de la pagina
  */
  public addCommentPage (commentPage: CommentPagInterface) {
    this.commentsPageCollection.add(commentPage);
  }
}
