import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AlertComponent, DropdownDirective, PlaceholderDirective, LoadingSpinnerComponent],
  imports: [CommonModule],
  exports: [AlertComponent, DropdownDirective, PlaceholderDirective, LoadingSpinnerComponent, CommonModule],
  entryComponents: [AlertComponent]
})
export class SharedModule {}
