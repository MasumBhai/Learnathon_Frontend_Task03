import {Injectable} from '@angular/core';
import {Page} from "./page";
import {PagedData} from "./paged-data";
import {catchError, Observable, of, throwError} from 'rxjs';
import {delay, map} from 'rxjs/operators';
import {AllUser} from "./all-user";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {environment} from "../../environments/environment";

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
    
    // baseUrl = 'http://three60.learnathon.net/api1/api/register'
    url = environment.apiUrl;
    front: any;
    total_count: any;
    
    constructor(private http: HttpClient) {
        this.front = [{
            'id': '05fb32e7-9fae-4879-8379-d037937fdc241',
            'username': 'MAKING FANTASY FOOTBALL',
            'dateOfBirth': 'A',
            'email': 'FCF@gmial.com',
            'serialNo': 1
        }, {
            'id': '05fb32e7-9fae-4879-8379-d037937fdc242',
            'username': 'MAKING FANTASY FOOTBALL',
            'dateOfBirth': 'B',
            'email': 'FCF1@gmail.com',
            'serialNo': 2
        }, {
            'id': '05fb32e7-9fae-4879-8379-d037937fdc243',
            'username': 'MAKING FANTASY FOOTBALL',
            'dateOfBirth': 'C',
            'email': 'FCF2@tahoo.com',
            'serialNo': 3
        }, {
            'id': '05fb32e7-9fae-4879-8379-d037937fdc244',
            'username': 'MAKING FANTASY FOOTBALL',
            'dateOfBirth': 'A REAL THING',
            'email': 'FCF3@gmail.com',
            'serialNo': 4
        }, {
            'id': '05fb32e7-9fae-4879-8379-d037937fdc245',
            'username': 'MAKING FANTASY FOOTBALL',
            'dateOfBirth': 'A REAL THING',
            'email': 'FCF3@gmail.com',
            'serialNo': 5
        },
        ];
            
        this.recalculateSerailNo();
        this.total_count = this.front.length;
    }
    
    recalculateSerailNo() {
        let counter: number = 1
        this.front.forEach((page: { serialNo: number; }) => {
            page.serialNo = counter;
            counter = counter + 1;
        })
    }
    
    deleteUser(id: string) {
        const newFront = this.front.filter((page: { id: string; }) => page.id != id)
        console.log(newFront)
        this.front = newFront;
        console.log(this.front);
        this.recalculateSerailNo();
    }
    
    editUser(id: string) {
        this.recalculateSerailNo();
    }
    
    findAll(page: number): Observable<UserData> {
        let params = new HttpParams();
        
        params = params.append('querypage', String(page));
        
        const httpOptions = {
            headers: new HttpHeaders({'Content-Type': 'application/json'})
        };
        
        // @ts-ignore
        return this.http.get<UserData>(this.baseUrl, {params}).pipe(
            map((userData: UserData) => userData),
            catchError(err => throwError(err))
        )
    }
    
    
}
