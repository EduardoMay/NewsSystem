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
    this.newsCollection = this.angularFirestor.collection<NewInterface>('news');
    this.news = this.newsCollection.valueChanges();
  }

  // obtener todas las noticias
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

  public addNew(newInfo: NewInterface): void {
    this.newsCollection.add(newInfo);
  }

}
