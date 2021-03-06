import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToasterService } from '../common/toaster.service';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isAutherized = new Subject<boolean>()
  constructor(private firebaseAuthentication: AngularFireAuth,
    private router: Router,private storage:Storage,
    private toasterService: ToasterService) { }
  logout() {
    this.firebaseAuthentication.auth.signOut()
      .then(res => {
        localStorage.clear();
        this.router.navigate(['/login'])
        this.toasterService.normalToast("Your session logout", 'danger');
        this.isAutherized.next(false)
      })
      .catch(err => {
        console.log(`signup failed ${err}`);
        alert(err)
        // this.error = err.message;
      });
  }
  signin(user: User): Promise<firebase.auth.UserCredential> {
    let { email, password } = user;
    return this.firebaseAuthentication.auth.signInWithEmailAndPassword(email, password)
  }
  setUser(res) {
    localStorage.setItem("user", JSON.stringify(res.user))
    this.storage.set("user",res.user);
    this.toasterService.normalToast("Your session login", 'success')
  }
}
