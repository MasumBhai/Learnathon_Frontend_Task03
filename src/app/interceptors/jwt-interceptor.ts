import {Injectable} from "@angular/core";
import {
    HttpInterceptor, HttpHandler, HttpRequest, HttpEvent,
} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        request = request.clone({headers: request.headers.set('Content-Type', 'application/json')});
        let token: string | null = localStorage.getItem("accessToken");
        if (token) {
            request = request.clone({headers: request.headers.set('Authorization', 'Bearer ' + token)});
        }
        return next.handle(request);
    }
}
