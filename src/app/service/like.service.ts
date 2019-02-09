import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  private likesCollection: AngularFirestoreCollection<Like>;
  public likes: Observable<Like[]>;
  private likesDoc: AngularFirestoreDocument<Like>;
  public like: Observable<Like>;

  constructor(private angularFirestore: AngularFirestore) {
    this.likesCollection = this.angularFirestore.collection<Like>('likes');
    this.likes = this.likesCollection.valueChanges();
  }

  public addLike(likeNew: Like): void {
    this.likesCollection.add(likeNew);
  }
}
