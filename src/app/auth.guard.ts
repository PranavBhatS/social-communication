import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router,private loginService:LoginService) {
    console.log("is called")
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const token = localStorage.getItem('user');
    if (token) {
      this.loginService.isAutherized.next(true)
      return true
    } else {
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      this.loginService.isAutherized.next(false)
      return false;
    }

  }

}
