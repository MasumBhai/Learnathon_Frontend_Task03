import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo = new BehaviorSubject(null); // will be used by the route guard to verify the user is login or not in later part
  jwtHelper = new JwtHelperService();

  /*
Because if an application closes and reopens all variables will be empty if that the case route guard unable to read
the user information which makes our application authentication process inconsistent. So it is a mandatory step to
load the user information in the 'AuthService' constructor.
*/

  constructor() {
    this.loadUserInfo();
  }

  userLogin(login: any): Observable<boolean> {
    if (login && login.log_user && login.log_password) {
      const sampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";

      return of(sampleJWT).pipe(
        map((token) => {
          if (!token) {
            return false;
          }
          localStorage.setItem("access_token", token); // For SPA, common approach to store, the token is in browser local storage.
          const decodedUser = this.jwtHelper.decodeToken(token);
          this.userInfo.next(decodedUser);
          // alert("ok")
          return true;
        }));
    }
    // console.log(JSON.stringify(this.log_in_form.value,null,2))
    return of(false); // the 'of' operator to make observable type because when we change the logic to API code that needs to be rewritten will be very less
  }


  private loadUserInfo() {
    let userdata = this.userInfo.getValue();
    if (!userdata) {
      const access_token = localStorage.getItem('access_token');
      if (access_token) {
        userdata = this.jwtHelper.decodeToken(access_token);
        this.userInfo.next(userdata);
      }
    }
  }
}
