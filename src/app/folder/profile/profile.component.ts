import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import * as firebase from 'firebase';
import { ToasterService } from 'src/app/common/toaster.service';
import { CameraOptions, Camera } from '@ionic-native/camera/ngx';
import { ActionSheetController, Platform } from '@ionic/angular';


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

  imagePickerOptions: CameraOptions = {
    quality: 100,
    saveToPhotoAlbum: true
  }
  currentImage

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage,
    private toasterService: ToasterService, private camera: Camera,
    public actionSheetController: ActionSheetController,private platform:Platform) {

  }

  ngOnInit() { }
  ionViewWillEnter() {
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    this.userProfilePic = this.userInfo.photoURL;
  }
  updateProfilePic() {
    if(this.platform.is("hybrid")) {
      this.selectImage()
      return
    }
    this.fileBtn.nativeElement.click()
  }
  uploadPic(event?) {
    if (!this.platform.is("hybrid") &&event.target.files && event.target.files[0]) {
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
      photoURL: this.userProfilePic
    }).then(() => {

      this.userInfo = JSON.parse(localStorage.getItem("user"));
      this.userInfo['photoURL'] = this.userProfilePic;
      localStorage.setItem("user", JSON.stringify(this.userInfo));
      this.toasterService.normalToast("picture updated successfully", 'success')
    }).catch((error) => {
      console.log(error)

    });
  }
  saveImageRef(filePath, file) {
    return {
      task: this.storage.upload(filePath, file)
      , ref: this.storage.ref(filePath)
    };
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select Image',
      cssClass:"action-sheet",
      buttons: [{
        text: 'Gallery',
        icon: 'image-sharp',
        cssClass:"galery",
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Camera',
        icon: 'camera-sharp',
        cssClass:"camera",
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass:"cancel",
      }]
    });
    await actionSheet.present();
  }

  takePicture(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options).then((imageData) => {
      this.userProfilePic = 'data:image/jpeg;base64,' + imageData;
      this.dataURLtoFile(this.userProfilePic);
    }, (err) => {
      // Handle error
    });
  }

  dataURLtoFile(dataurl) {
    fetch(dataurl)
      .then(res => res.blob())
      .then(blob => {
        const fileraw = blob;
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
      });
  }
}
