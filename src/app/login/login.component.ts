import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginModel } from '../models/login.model';

@Component({
  selector: 'pr-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authenticationFailed = false;
  credentials: LoginModel = {
    login: '',
    password: ''
  };

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  authenticate() {
    return this.userService.authenticate(this.credentials).subscribe(
      success => {
        this.router.navigate(['/']);
      },
      error => this.authenticationFailed = true
    );
  }
}
