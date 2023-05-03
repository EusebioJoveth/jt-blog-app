import { Injectable } from '@angular/core';
import { Firestore, collection,
  collectionData} from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private firestore: Firestore) { }

  async getCategory(){
    const collectionInsatnce = collection(this.firestore, 'categories');
    return  collectionData (collectionInsatnce, {idField: 'id'});
  }
}
