/**
 * @fileoverview DataApiService, en este servicio se implementan diferentes metodos
 * para obtener datos de la base de datos
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento el CRUD
 *
 * La primara version de DataApiService fue escrita por Eduardo May
*/

import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NewInterface } from '../models/new';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {

  private newsCollection: AngularFirestoreCollection<NewInterface>;
  public news: Observable<NewInterface[]>;
  private newsDoc: AngularFirestoreDocument<NewInterface>;
  private new: Observable<NewInterface>;
  public selectedNew: NewInterface = {
    id: null
  };

  constructor(private angularFirestore: AngularFirestore) {
    // guarda todas las colecciones obtenidad de la base de datos
    this.newsCollection = this.angularFirestore.collection<NewInterface>('news');
    this.news = this.newsCollection.valueChanges();
  }

  /**
   * obtener todas las noticias de firebase
  */
  public getAllNews() {
    return this.news = this.newsCollection.snapshotChanges()
      .pipe( map( changes => {
        return changes.map( action => {
          const data = action.payload.doc.data() as NewInterface;
          data.id = action.payload.doc.id;
          return data;
        });
      }));
  }

  /**
   * obtener un registro
  */
 public getOneNew( idbook: string ) {
   this.newsDoc = this.angularFirestore.doc<NewInterface>(`news/${idbook}`);
   return this.new = this.newsDoc.snapshotChanges().pipe( map( action => {
     if ( action.payload.exists === false) {
       return null;
     } else {
       const data = action.payload.data() as NewInterface;
       data.id = action.payload.id;
       return data;
     }
   }));
 }

  /**
   * guardar una noticias nueva a firebase
  */
  public addNew(newInfo: NewInterface): void {
    this.newsCollection.add(newInfo);
  }

  public deleteNew( idNew: string ) {
    this.newsDoc = this.angularFirestore.doc<NewInterface>(`news/${idNew}`);
    this.newsDoc.delete();
  }

}
