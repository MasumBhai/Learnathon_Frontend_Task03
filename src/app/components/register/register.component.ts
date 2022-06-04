import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() {
  }

  Roles: any = ['Admin', 'Author', 'Reader'];
  email = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  model: any | NgbDateStruct;
  panelOpenState = false;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  ngOnInit(): void {
  }

}
