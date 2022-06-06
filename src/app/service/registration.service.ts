import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Users} from "./users";


const baseUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) {
  }

  url: string = 'http://three60.learnathon.net/api1/api/register'

  getAll() {
    return this.http.get<Users[]>(baseUrl);
  }

  getById(id: string) {
    return this.http.get<Users>(`${baseUrl}/${id}`);
  }

  create(params: any) {
    return this.http.post(baseUrl, params);
  }

  update(id: string, params: any) {
    return this.http.put(`${baseUrl}/${id}`, params);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`);
  }

}
