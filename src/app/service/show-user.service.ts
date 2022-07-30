import {Injectable} from '@angular/core';
import {Page} from "./page";
import {PagedData} from "./paged-data";
import {catchError, Observable, of, throwError} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {AllUser} from "./all-user";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

export interface UserData {
    id: string;
    username: string;
    email: string;
    birthday: string;
    hashPassword: string;
}

@Injectable({
    providedIn: 'root'
})
export class ShowUserService {
    
    baseUrl = 'http://three60.learnathon.net/api1/api/register'
    
    constructor(private http: HttpClient) {
    }
    
    findAll(page: number): Observable<UserData> {
        let params = new HttpParams();
        
        params = params.append('querypage', String(page));
        
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        }
        
        // @ts-ignore
        return this.http.get<UserData>(this.baseUrl, {params}).pipe(
            map((userData: UserData) => userData),
            catchError(err => throwError(err))
        )
    }
}
