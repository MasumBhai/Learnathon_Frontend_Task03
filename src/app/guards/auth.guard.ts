/*
have to register this AuthGuard in AppModule providers array
 */
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../service/auth.service";

/*
The guards are also providers, so to make them consume by other entities they need to be decorated with an 'Injectable' decorator
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router) {
  }

  canActivate( // 'canActivate' is a guard method which gets automatically executed on the invocation of guard by the application routes
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let userData = this.authService.userInfo.getValue(); // Fetching user information from the 'userInfo' variable in the AuthService
    // @ts-ignore
    if (userData && userData.sub) { // sub represents user id value
      if (state.url.indexOf("/login") != -1) {
        // logged-in user trying to access login page
        this.router.navigate(["/show_user"]);  //todo: Change inside navigate()
        return false;
      } else {
        return true;
      }
    } else {
      if (state.url.indexOf("/login") == -1) {
        // not logged in users only navigate to login page
        this.router.navigate(["/login"]);
        return false;
      } else {
        return true;
      }
    }
  }

}
/*
So now if a user is logged in then the user can access any page other than the login page and suppose if not logged in then always redirect to the login page.
 */
