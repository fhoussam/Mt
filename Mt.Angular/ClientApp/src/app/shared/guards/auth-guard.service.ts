import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private auth: AuthService) { }
   
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.auth.getUserInfo().pipe(
      map((x) => {
        let result = !!x;
        let role = x?.role;

        let targetRoute = route.routeConfig?.path as string;

        if (!result)
          this.auth.authenticateUser(targetRoute);

        //authenticateUser gets called but whole execution is not over yet,
        //so as a result you see a redirection to 403 page before going to sts login page
        //that's why "result != not null" is part of the condition 
        if (result && targetRoute === "customers") {

          if (role !== "admin" && role !== "manager") {
            this.router.navigate(['/forbidden']);
          }

          return true;
        }

        if (result && targetRoute === "orders") {

          if (role !== "admin") {
            this.router.navigate(['/forbidden']);
          }

          return true;
        }

        return result;
      })
    )
  }
}
