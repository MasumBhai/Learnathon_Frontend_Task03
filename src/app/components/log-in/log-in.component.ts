import {Component, OnInit} from '@angular/core';

import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import configUrl from '../../../assets/api_config/api_configuration.json';


@Component({
    selector: 'app-log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
    
    private jwtHelper: JwtHelperService = new JwtHelperService();
    
    url = configUrl.apiServer.url + '/api/authentication/';
    invalidLogin?: boolean;
    panelOpenState: boolean = false;
    submitted = false;
    hideConfPass: boolean = false;
    hidePass: boolean = false;
    
    userInfo = new BehaviorSubject(null); // to store the user info decoded from the JWT access token
    
    log_in_form: FormGroup = new FormGroup({
        log_user: new FormControl(''),
        log_password: new FormControl(''),
    });
    
    constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) {
    }
    
    get f(): { [key: string]: AbstractControl } {
        return this.log_in_form.controls;
    }
    
    ngOnInit(): void {
        
        this.log_in_form = this.formBuilder.group(
            {
                log_user: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(3),
                        Validators.maxLength(24)
                    ]
                ],
                log_password: [
                    '',
                    [
                        Validators.required,
                        Validators.minLength(8),
                        Validators.maxLength(40)
                    ]
                ],
            },
        );
    }
    
    LogInSubmit() {
        console.log(JSON.stringify(this.log_in_form.value, null, 2)) // form printing
        
        const credentials = JSON.stringify(this.log_in_form.value);
        this.http.post(this.url + "login", credentials, {
            headers: new HttpHeaders({
                "Content-Type": "application/json"
            })
        }).subscribe(response => {
            const token = (<any>response).token;
            localStorage.setItem("jwt", token);
            this.invalidLogin = false;
            alert("Logged In successfully");
            this.router.navigate(["/show_user"]);
        }, err => {
            alert('Login Credentials didn\'t match. ');
            this.invalidLogin = true;
        });
    }
}
