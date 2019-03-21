import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  birthYearCtrl: FormControl;

  userForm: FormGroup;
  constructor(formBuilder: FormBuilder) {
    this.loginCtrl = formBuilder.control('', [Validators.required]);
    this.passwordCtrl = formBuilder.control('', [Validators.required]);
    this.birthYearCtrl = formBuilder.control('', [Validators.required]);
    this.userForm = formBuilder.group({
      login: this.loginCtrl,
      password: this.passwordCtrl,
      birthYear: this.birthYearCtrl
    });
  }

  ngOnInit() {
  }

  register() {
  }

  isDirtyAndRequired(formField: FormControl): boolean {
    return formField.hasError('required') && formField.dirty;
  }
}
