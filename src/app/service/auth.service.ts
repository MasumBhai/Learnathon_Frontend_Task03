import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtHelperService} from "@auth0/angular-jwt";
import {HttpClient} from "@angular/common/http";

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

  constructor(private http: HttpClient) {
    this.loadUserInfo();
  }

  userLogin(login: any): Observable<boolean> {
    if (login && login.log_user && login.log_password) {
      // // These lines are for mocked JWT token practice
      // // const sampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkJyYWlueV9Gb29sIiwicGFzc3dvcmQiOiJCb2xib19OYSJ9.eGR_PzuAwLoJGR8sEroPHDAcqQzLL8vM21MRKrDYygs";
      // const sampleJWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlRlc3QiLCJzdWIiOjIsImlhdCI6MTYwNDMwOTc0OSwiZXhwIjoxNjA0MzA5ODA5fQ.jHez9kegJ7GT1AO5A2fQp6Dg9A6PBmeiDW1YPaCQoYs";
      //
      // const refreshToken = "dummy";
      //
      // return of(sampleJWT).pipe(
      //   map((token:any) => {
      //     if (!token) {
      //       return false;
      //     }
      //     localStorage.setItem("access_token", token); // For SPA, common approach to store, the token is in browser local storage.
      //     const decodedUser = this.jwtHelper.decodeToken(token);
      //     //
      //     // //todo: change here
      //     // const data:any = {
      //     //   access_token: token.access_token,
      //     //   refresh_token: token.refresh_token,
      //     //   log_user: decodedUser.username,
      //     //   log_password:decodedUser.password,
      //     //   userid: decodedUser.id,
      //     //   tokenExpiration: decodedUser.exp,
      //     // }
      //     //
      //     // this.userInfo.next(data);
      //     // console.log(data)  // we can manipulate the keys of JWT token
      //     // console.log(decodedUser) // this directly fetch from JWT token
      //
      //     this.userInfo.next(decodedUser);
      //     return true;
      //   }));


      // to use the API endpoint for user login in the AuthService
      return this.http.post("http://localhost:3000/auth/login", login).pipe( //todo: change url of the token api server
        map((data: any) => {
          if (!data) {
            return false;
          }
          localStorage.setItem('access_token', data.access_token); // this method is vulnerable to XSS attack
          localStorage.setItem('refresh_token', data.refresh_token);
          const decodedUser = this.jwtHelper.decodeToken(data.access_token);
          console.log(decodedUser)
          localStorage.setItem('expiration', decodedUser.exp); //  Store jwt 'access_token' expiration value in local storage so that it can be used for deciding to call refresh token API
          this.userInfo.next(decodedUser);
          return true;
        })
      );
    }
    // console.log(JSON.stringify(this.log_in_form.value,null,2))
    return of(false); // the 'of' operator to make observable type because when we change the logic to API code that needs to be rewritten will be very less
  }

  callRefershToken(payload: any){
    return this.http.post("http://localhost:3000/auth/refreshtoken",payload); //todo: change here
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
