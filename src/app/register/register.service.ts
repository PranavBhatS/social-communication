import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  constructor(private firebaseAuthentication: AngularFireAuth) { }

  signup(user:User):Promise<firebase.auth.UserCredential> {
    let {email,password} = user;
    return this.firebaseAuthentication.auth.createUserWithEmailAndPassword(email, password)
  }
}
