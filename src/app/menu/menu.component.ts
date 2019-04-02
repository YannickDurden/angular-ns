import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription, concat, of, EMPTY } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, catchError } from 'rxjs/operators';

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
    this.userEventsSubscription = this.userService.userEvents
      .pipe(
        switchMap(
          user => user
            ? concat(of(user), this.userService.scoreUpdates(+user.id)).pipe(catchError(() => EMPTY))
            : of(null)
        )
      )
      .subscribe(user => this.user = user);
  }

  ngOnDestroy() {
      this.userEventsSubscription.unsubscribe();
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
