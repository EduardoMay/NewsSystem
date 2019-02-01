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

  constructor(private angularFirestor: AngularFirestore) {
    // guarda todas las colecciones obtenidad de la base de datos
    this.newsCollection = this.angularFirestor.collection<NewInterface>('news');
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
   * guardar una noticias nueva a firebase
  */
  public addNew(newInfo: NewInterface): void {
    this.newsCollection.add(newInfo);
  }

}
