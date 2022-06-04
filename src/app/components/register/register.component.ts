import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ConfirmedValidator} from './confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  submitted = false;

  constructor(private formBuilder: FormBuilder) {
  }

  Roles: any = ['Admin', 'Author', 'Reader'];
  hide_pass = true;
  hide_conf_pass = true;
  model: any | NgbDateStruct;
  panelOpenState = true;

  registerForm = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    dateOfBirth: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        fullname: ['', Validators.required],
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue]
      },
      {
        validators: ConfirmedValidator('password', 'confirm_password')
      }
    );
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(JSON.stringify(this.registerForm.value, null, 2)); //todo: change here
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }

  get f():{ [key: string]: AbstractControl }{
    return this.registerForm.controls;
  }

  get userName() {
    return this.registerForm.get('username')
  }

  // getErrorMessage() {
  //   if (userName().hasError('required')) {
  //     return 'You must enter a value';
  //   }
  //
  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }


}
