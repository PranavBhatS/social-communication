import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { ToasterService } from 'src/app/common/toaster.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  mainuser: AngularFirestoreDocument
  userInfo: any;
  userProfilePic = null;
  @ViewChild('fileBtn', { static: false }) fileBtn: {
    nativeElement: HTMLInputElement
  };
  constructor(private afs: AngularFirestore, private storage: AngularFireStorage,private toasterService:ToasterService) {

  }

  ngOnInit() { }
  ionViewWillEnter() {
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    this.userProfilePic = this.userInfo.photoURL;
  }
  updateProfilePic() {
    this.fileBtn.nativeElement.click()
  }
  uploadPic(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (e: any) => {
        const fileraw = event.target.files[0];
        const filePath = '/Image/' + (Math.floor(1000 + Math.random() * 9000) + 1);
        const result = this.saveImageRef(filePath, fileraw);
        const ref = result.ref;
        result.task.then(a => {
          ref.getDownloadURL().subscribe(a => {
            console.log(a);
            this.userProfilePic = a;
            this.saveProfileData()
          });
        })
      }
    }
  }
  saveProfileData() {
    var user1 = firebase.auth().currentUser;
      user1.updateProfile({
        displayName: this.userInfo.userName,
        photoURL:this.userProfilePic
      }).then( () =>{
        
        this.userInfo = JSON.parse(localStorage.getItem("user"));
        this.userInfo['photoURL'] = this.userProfilePic;
        localStorage.setItem("user",JSON.stringify(this.userInfo));
        this.toasterService.normalToast("picture updated successfully", 'success')
      }).catch( (error)=> {
        console.log(error)
       
      });
  }
  saveImageRef(filePath, file) {
    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }
}
