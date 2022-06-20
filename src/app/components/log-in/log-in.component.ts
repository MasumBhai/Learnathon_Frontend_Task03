import {Component, OnInit} from '@angular/core';

import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject, Observable, of} from "rxjs";
import {map} from "rxjs/operators";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {AuthService} from "../../service/auth.service";

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  panelOpenState: boolean = false;
  submitted = false;
  hideConfPass: boolean = false;
  hidePass: boolean = false;

  userInfo = new BehaviorSubject(null); // to store the user info decoded from the JWT access token
  jwtHelper = new JwtHelperService();

  log_in_form: FormGroup = new FormGroup({
    log_user: new FormControl(''),
    log_password: new FormControl(''),
  });

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router:Router) {
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

  LogInSubmit(){
    console.log(JSON.stringify(this.log_in_form.value,null,2))
    this.authService.userLogin(this.log_in_form.value)
      .subscribe(
        (value: boolean) => {
          if(value){
            alert('success');
            this.router.navigate(["/show_user"]);
          }else{
            alert('failed');
          }
        },
        (error)=>{
          alert('failed error');
        }
      );
  }
}
