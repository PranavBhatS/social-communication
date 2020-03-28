import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private toastController:ToastController) { }

 async normalToast(message,color) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color:color
    });
    toast.present();
  }
}
