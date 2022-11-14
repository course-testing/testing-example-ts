import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarsComponent } from './stars.component';

@Component({
  selector: 'app-stars',
  template: '',
})
export class FakeStarsComponent implements Partial<StarsComponent> {
  @Input()
  rate: number = 0;

  @Output()
  rateSelected = new EventEmitter<number>();
}

@NgModule({
  imports: [CommonModule],
  declarations: [FakeStarsComponent],
  providers: [],
  exports: [FakeStarsComponent]
})
export class StarsComponentTestingModule {
}
