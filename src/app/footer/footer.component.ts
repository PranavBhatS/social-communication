import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  path
  constructor(private loginService:LoginService) {
    this.path = window.location.pathname;
   }

  ngOnInit() {

  }
  logout() {
    this.loginService.logout()
  }
  pathChange(path) {
    this.path = path;
  }
}
