import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsComponent } from './stars.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StarsComponent],
  providers: [],
  exports: [StarsComponent]
})
export class StarsComponentModule {
}
