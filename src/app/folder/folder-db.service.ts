import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FolderDbService {

  constructor(private firestore: AngularFirestore) { }
  inviteUser(email) {
    debugger
    let data = this.firestore.collection<any>("users", ref => {
      return ref.where('email', '==', email)
    })
    return data.valueChanges();
  }

  createOneOnOneRoom(room, from) {
    this.firestore.collection(room).get()
  }
  
}
