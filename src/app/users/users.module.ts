import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { USERS_ROUTES } from './users.routes';
import { SharedModule } from '../shared/shared.module';
import { MoneyHistoryComponent } from './money-history/money-history.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    MoneyHistoryComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(USERS_ROUTES)
  ]
})
export class UsersModule { }
