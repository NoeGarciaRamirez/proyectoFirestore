import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore) {

   }

  public insertar(articulos, articulo) {
    return this.angularFirestore.collection(articulos).add(articulo);
  }

}

