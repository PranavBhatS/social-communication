import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { LoginService } from './login.service';
import { ToasterService } from '../common/toaster.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    
    constructor(private router:Router,private loginService:LoginService,private toasterService:ToasterService) { }

  ngOnInit() {
  }
  onClick() {
    let user:User = {
      email:'pranav@gmail.com',
      password:"1234567"
    }
    this.loginService.signin(user).then(res=>{
      this.loginService.setUser(res);
      this.router.navigate(['/folder/Profile'])
    })
    .catch(err=>{
      console.log(err)
    })
    // this.logout()
  }
  
}
