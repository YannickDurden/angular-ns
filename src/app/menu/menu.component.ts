import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from '../models/user.model';
import { Subscription, concat, of, EMPTY, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { switchMap, catchError, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'pr-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent implements OnInit {
  navbarCollapsed = true;
  // user: UserModel;
  userEvents: Observable<UserModel>;
  userEventsSubscription: Subscription;

  constructor(public userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userEvents = this.userService.userEvents
      .pipe(
        switchMap(
          user => user
            ? concat(of(user), this.userService.scoreUpdates(+user.id)).pipe(catchError(() => EMPTY))
            : of(null)
        ),
        shareReplay()
      );
  }

  toggleNavbar(): boolean {
    return this.navbarCollapsed = !this.navbarCollapsed;
  }

  logout(event: Event) {
    event.preventDefault();
    this.userService.logout();
    this.router.navigate(['/']);
  }

}
