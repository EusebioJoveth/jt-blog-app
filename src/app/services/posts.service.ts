import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData,
  doc,
  docSnapshots,
  getDocs,
  onSnapshot,
  query, where, limit, orderBy, getDoc, updateDoc, increment } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class PostsService {

  allPost: Array<any> = [];

  constructor(private firestore: Firestore) { }

  async getPosts(){
    const collectionInsatnce =  collection(this.firestore, 'posts');
    return  collectionData (collectionInsatnce, {idField: 'id'});
  }

  async getPostsByFeatured(){
    this.allPost = []
    const queryRef =  query(collection(this.firestore, "posts"), where("isFeatured", "==", true), limit(4));

    const querySnapshot = await getDocs(queryRef);

    querySnapshot.forEach((doc) => {
      const data =doc.data();
      const id = doc.id;
      this.allPost.push({id, ...data});
    });
    return this.allPost
  }

  async getLatestPosts(){
    this.allPost = []
    const queryRef =  query(collection(this.firestore, "posts"), orderBy("created"));

    const querySnapshot = await getDocs(queryRef);

    querySnapshot.forEach((doc) => {
      const data =doc.data();
      const id = doc.id;
      this.allPost.push({id, ...data});
    });
    return this.allPost
  }

  async getCategoryPosts(categoryId:string){
    this.allPost = []
    const queryRef =  query(collection(this.firestore, "posts"), where("category.categoryId", "==", categoryId), limit(4));

    const querySnapshot = await getDocs(queryRef);

    querySnapshot.forEach((doc) => {
      const data =doc.data();
      const id = doc.id;
      this.allPost.push({id, ...data});
    });
    return this.allPost
  }

  async getOnePost(idPost:string){
    const documentReference =  doc(this.firestore, "posts", idPost);
    return await getDoc(documentReference);
  }

  async countViews(postId:string){
    const viewsCount = {
      views: increment (1)

    }
    const docInstance = doc(this.firestore, 'posts', postId);

    return await updateDoc(docInstance, viewsCount);
  }
}
