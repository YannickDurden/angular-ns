import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlValidationDirective } from './form-control-validation.directive';
import { FormLabelDirective } from './form-label.directive';
import { FormLabelValidationDirective } from './form-label-validation.directive';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [FormControlValidationDirective, FormLabelDirective, FormLabelValidationDirective],
  imports: [CommonModule],
  exports: [
    NgbAlertModule,
    FormLabelDirective,
    NgbPaginationModule,
    FormLabelValidationDirective,
    FormControlValidationDirective,
  ]
})
export class SharedModule {}
