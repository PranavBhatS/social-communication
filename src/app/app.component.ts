import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { LoginService } from './login/login.service';
import { Network } from '@ionic-native/network/ngx';
import { ToasterService } from './common/toaster.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  isAutherized = false;
  userInfo
  

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private loginService: LoginService,
    private network: Network,
    private toaster: ToasterService
  ) {
    this.loginService.isAutherized.subscribe(res => this.isAutherized = res)
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.networkStatus();
    });
  }
  networkStatus() {
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
      this.toaster.normalToast('network was disconnected :-(', 'danger')
    });
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected!');
      this.toaster.normalToast('network connected!', 'success')
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          this.toaster.normalToast('we got a wifi connection, woohoo!', 'success')
        }
      }, 3000);
    });
  }

  ngOnInit() {
    // this.router.navigate(['/login'])
    this.userInfo = JSON.parse(localStorage.getItem("user"));
    // const path = window.location.pathname.split('folder/')[1];
    // if (path !== undefined) {
    //   this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    // }
  }
  logout() {
    this.loginService.logout()
  }
  
}


// /exerciseplan/workout