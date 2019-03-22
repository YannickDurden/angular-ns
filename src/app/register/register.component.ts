import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  confirmPasswordCtrl: FormControl;
  birthYearCtrl: FormControl;

  userForm: FormGroup;
  passwordForm: FormGroup;

  currentYear: number = new Date().getFullYear();
  registrationFailed = false;

  static passwordMatch(passwordForm: FormGroup) {
    const pwd = passwordForm.get('password');
    const confirmPwd = passwordForm.get('confirmPassword');

    return pwd.value !== confirmPwd.value ? { matchingError : true  } : null;
  }

  constructor(formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.loginCtrl = formBuilder.control('', [Validators.required, Validators.minLength(3)]);
    this.passwordCtrl = formBuilder.control('', [Validators.required]);
    this.confirmPasswordCtrl = formBuilder.control('', [Validators.required]);
    this.birthYearCtrl = formBuilder.control('',
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(this.currentYear)
      ]
    );

    this.passwordForm = formBuilder.group({
      password: this.passwordCtrl,
      confirmPassword: this.confirmPasswordCtrl
    }, { validators: RegisterComponent.passwordMatch });
    this.userForm = formBuilder.group({
      login: this.loginCtrl,
      passwordForm: this.passwordForm,
      birthYear: this.birthYearCtrl
    });
  }

  ngOnInit() {}

  register() {
    const login = this.userForm.get('login').value;
    const password = this.passwordForm.get('password').value;
    const birthYear = this.userForm.get('birthYear').value;

    return this.userService.register(login, password, birthYear).subscribe(
      response => this.router.navigate(['/']),
      error => this.registrationFailed = true
    );
  }

  isDirtyAndRequired(formField: FormControl): boolean {
    return formField.hasError('required') && formField.dirty;
  }
}
