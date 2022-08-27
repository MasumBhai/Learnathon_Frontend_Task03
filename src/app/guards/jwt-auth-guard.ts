import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {lastValueFrom, Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
    providedIn: 'root'
})

export class JwtAuthGuard implements CanActivate {
    
    constructor(private router: Router, private http: HttpClient) {
    }
    
    private jwtHelper: JwtHelperService = new JwtHelperService();
    
    
    async canActivate() {
        //get the jwt token which are present in the local storage
        const token = localStorage.getItem("accessToken");
        
        //Check if the token is expired or not and if token is expired then redirect to login page and return false
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        
        const isRefreshSuccess = await this.refreshingTokens(token);
        if (!isRefreshSuccess) {
            this.router.navigate(["/login"]);
        }
        
        return isRefreshSuccess;
    }
    
    private async refreshingTokens(token: string | null): Promise<boolean> {
        const refreshToken: string | null = localStorage.getItem("refreshToken");
        
        if (!token || !refreshToken) {
            return false;
        }
        
        const tokenModel = JSON.stringify({accessToken: token, refreshToken: refreshToken});
        
        let isRefreshSuccess: boolean;
        try {
            const response = await lastValueFrom(this.http.post(environment.apiUrl + "authenticate/refresh-token", tokenModel));
            const newToken = (<any>response).accessToken;
            const newRefreshToken = (<any>response).refreshToken;
            localStorage.setItem("accessToken", newToken);
            localStorage.setItem("refreshToken", newRefreshToken);
            alert("Token renewed successfully")
            isRefreshSuccess = true;
        } catch (ex) {
            console.error(ex);
            isRefreshSuccess = false;
        }
        return isRefreshSuccess;
    }
}
