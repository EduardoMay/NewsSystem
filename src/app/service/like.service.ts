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

  public addLike(likeNew: LikeInterface): void {
    this.likesCollection.add(likeNew);
  }
}
