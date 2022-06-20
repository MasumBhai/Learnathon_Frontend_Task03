import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, switchMap} from "rxjs";
import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.indexOf('/refreshtoken') > -1) { // f we don't add this logic to our interceptor, we will face big trouble like infinite loops of observable and will throw an error about maximum stack exceeded for observables
      return next.handle(req);
    }
    const access_token = localStorage.getItem('access_token');
    if (access_token) {
      const expiration = localStorage.getItem('expiration');
      if (Date.now() < Number(expiration) * 1000) { // Checks for jwt access token expiration, if access token not expired we allow interceptor to add an authorization header to HTTP calls
        const transformedReq = req.clone({
          headers: req.headers.set('Authorization', `bearer ${access_token}`),
        });
        return next.handle(transformedReq);
      }
      const payload = {
        access_token: access_token,
        refresh_token: localStorage.getItem('refresh_token'),
      };
      return this.authService.callRefershToken(payload).pipe( // If the jwt access token expires, then calls the refresh token endpoint
        switchMap((newTokens: any) => {
          localStorage.setItem('access_token', newTokens.access_token);
          localStorage.setItem('refresh_token', newTokens.refresh_token);
          const decodedUser = this.jwtHelper.decodeToken(
            newTokens.access_token
          );
          localStorage.setItem('expiration', decodedUser.exp);
          this.authService.userInfo.next(decodedUser);
          const transformedReq = req.clone({
            headers: req.headers.set(
              'Authorization',
              `bearer ${newTokens.access_token}`
            ),
          });
          return next.handle(transformedReq);
        })
      );
    } else {
      return next.handle(req);
    }
    // const access_token = localStorage.getItem("access_token"); // Fetching jwt access token from the localStorage
    // const transformedReq = req.clone({  // Modifying the request by adding the authorization header
    //   headers: req.headers.set('Authorization', `bearer ${access_token}`)
    // });
    // return next.handle(transformedReq);
  }
}
