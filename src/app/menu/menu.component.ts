import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, OnDestroy {
  navbarCollapsed = true;
  user: UserModel;
  userEventsSubscription: Subscription;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userEventsSubscription = this.userService.userEvents.subscribe(
      user => this.user = user
    );
  }

  ngOnDestroy() {
    if (this.userEventsSubscription !=  null) {
      this.userEventsSubscription.unsubscribe();
    }
  }

  toggleNavbar(): boolean {
    return this.navbarCollapsed = !this.navbarCollapsed;
  }

  getAuthenticatedUser() {
    return this.user;
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
