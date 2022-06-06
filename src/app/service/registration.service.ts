import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  url: string = 'http://three60.learnathon.net/api1/api/register'

  saveUser(data: any) {
    return this.http.post(this.url, data)
  }

}
