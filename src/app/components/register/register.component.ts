import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import Validation from "./validation";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegistrationService} from "../../service/registration.service";
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private http: HttpClient,private userService: RegistrationService) {
  }

  model: any | NgbDateStruct;
  panelOpenState = false;
  submitted = false;
  hideConfPass: boolean = false;
  hidePass: boolean = false;

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    birthday: new FormControl(''),
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
        birthday: ['', [Validators.required]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
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

  getDate(date: string) {
    const a: string[] = date.split("-")
    return new Date(parseInt(a[0]), parseInt(a[1]), parseInt(a[2]));
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  private createUser() {
    this.userService.create(this.form.value)
      .pipe(first())
      .subscribe(() => {
        // this.alertService.success('User added', { keepAfterRouteChange: true });
        // this.router.navigate(['../'], { relativeTo: this.route });
        console.log(this.form.value)
      })
      // .add(() => this.loading = false);
      .add(() => this.submitted = true);
  }

  onSubmit(): void {
    this.submitted = true;

    // if (this.form.invalid) {
    //   return;
    // }

    // @ts-ignore
    const dob: Date = this.getDate(this.form.get('birthday').value)
    const updatedDateofBirth: any = dob.getDate() + "/" + dob.getMonth() + "/" + dob.getFullYear()

    // console.log(updatedDateofBirth)


    var formData = new FormData();
    // @ts-ignore
    formData.append("username", this.form.get('username').value);
    // @ts-ignore
    formData.append("email", this.form.get('email').value);
    // @ts-ignore
    formData.append("birthday", this.form.get('birthday').value);
    // formData.append("birthday", updatedDateofBirth);
    // @ts-ignore
    formData.append("password", this.form.get('password').value);
    // @ts-ignore
    formData.append("confirmPassword", this.form.get('confirmPassword').value);


    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    // this.http
    //   .post('http://three60.learnathon.net/api1/api/register', formData, httpOptions)
    //   .subscribe({
    //     next: (response) => console.log(response),
    //     error: (error) => console.log(error),
    //   });

    console.log(JSON.stringify(this.form.value, null, 2));
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    this.createUser()
    this.onReset()
  }



}
