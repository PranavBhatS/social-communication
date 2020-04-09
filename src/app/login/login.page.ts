import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../common/toaster.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  isFormSubmitted = false;
  constructor(private router: Router, private loginService: LoginService,
    private fb: FormBuilder, private toasterService: ToasterService, private alertController: AlertController) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }
  ionViewWillEnter() {
    this.isFormSubmitted = false;

  }

  get f() {
    return this.loginForm.controls;
  }
  isSubmitClicked = false;
  onClick() {
    this.isFormSubmitted = true;
    if (this.loginForm.invalid) {
      return
    }
    this.isSubmitClicked = true;
    let user: User = this.loginForm.value;
    this.loginService.signin(user).then(res => {
      this.loginService.setUser(res);
      this.router.navigate(['/folder/Profile'])
      this.loginForm.reset();
      this.isSubmitClicked = false;
    })
      .catch(err => {
        console.log(err)
        this.isSubmitClicked = false;
        this.toasterService.normalToast(err, 'danger')
      })
  }
  async  forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Prompt!',
      message: 'Message <strong>text</strong>!!!',
      buttons: [
        {
          text: 'draft',
          cssClass: 'primary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'yes',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'cancel',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
  }
}
