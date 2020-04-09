import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private firebaseAuthentication: AngularFireAuth,private firestore: AngularFirestore) { }

  signup(user:User):Promise<firebase.auth.UserCredential> {
    let {email,password} = user;
    return this.firebaseAuthentication.auth.createUserWithEmailAndPassword(email, password)
  }
  storeUser(user) {
    this.firestore.collection("users").add(user).then(res=>{
    })
    .catch(err=>{
      console.log(err)
    });
  }
}
