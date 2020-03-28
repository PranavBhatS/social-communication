import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LoginService } from './login/login.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  isAutherized = false;
  public appPages = [
    {
      title: 'Profile',
      url: '/folder/Profile',
      icon: 'person'
    },
    {
      title: 'Logout',
      url: '/folder/logout',
      icon: 'log-in'
    },

  ];
  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private loginService: LoginService,
  ) {
    // this.currentUrl = window.location.pathname
    // this.router.events.pipe(
    //   filter(event => event instanceof NavigationEnd)
    // ).subscribe((event: NavigationEnd) => {
    //   this.currentUrl = event.url
    //   if (document.getElementById('sideNav')) {
    //     if (this.currentUrl == '/login' || this.currentUrl == '/register') {
    //       document.getElementById('sideNav').style.display = 'none'
    //     } else {
    //       document.getElementById('sideNav').style.display = 'block'
    //       document.getElementById('sideNav').style.display = '123'
    //     }
    //   }
    // });
    this.loginService.isAutherized.subscribe(res=>this.isAutherized = res)
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    // this.router.navigate(['/login'])

    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }
  logout() {
    this.loginService.logout()
  }
  changeRoute() {
    if (this.appPages[this.selectedIndex].title === 'Logout') {
      this.logout()
      this.selectedIndex = 0;
    }
  }
}
