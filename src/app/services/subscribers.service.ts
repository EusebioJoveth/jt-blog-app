import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription';
import { Firestore, collection, addDoc,
  collectionData, doc, updateDoc, deleteDoc, query, where, getDocs, onSnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  allSubsCribers:Array<any> =[];

  constructor(private firestore: Firestore) { }

  async addSubscriber(subData:Subscription){
    const collectionInstance = collection(this.firestore, 'subscribers');
   return  await addDoc(collectionInstance, subData);

  }

  async checkSubscribe(subEmail:string){
    const que = query(collection(this.firestore, "subscribers"), where("email", "==", subEmail));

    const querySnapshot = await getDocs(que);
   /* querySnapshot.forEach((doc) => {
       const id = doc.id;
       const data = doc.data();
      this.allSubsCribers.push({id, ...data})
    });*/

    return querySnapshot;
  }



}


