import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import Validation from "./validation";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) {}

  model: any | NgbDateStruct;
  panelOpenState = false;
  submitted = false;
  hideConfPass: boolean = false;
  hidePass: boolean = false;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    dob: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
  });


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        username: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(24)
          ]
        ],
        email: ['', [Validators.required, Validators.email]],
        dateOfBirth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: [Validation.match('password', 'confirmPassword')]
      }
    );
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    // if (this.form.invalid) {
    //   return;
    // }

    console.log(JSON.stringify(this.form.value, null, 2));
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

}
