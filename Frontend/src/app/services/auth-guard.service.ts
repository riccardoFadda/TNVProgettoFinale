import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.auth.user.subscribe(
      response => {
        if(!response){
          console.log(response)
          this.router.navigate(['/login']);
          return false;
        }
      },
      error => {
        console.log(error)
      }
    )
    return true;
  }
}
