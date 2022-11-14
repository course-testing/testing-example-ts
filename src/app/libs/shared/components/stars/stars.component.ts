import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StarsComponent {
  private readonly MAX_RATE = 5;

  rateValue = 0;
  filledStars = 0;
  emptyStars = 5;

  @Input()
  set rate(rate: number) {
    this.rateValue = Math.max(0, Math.min(rate, this.MAX_RATE));
    this.filledStars = Math.min(parseInt(String(this.rateValue)), this.MAX_RATE);
    this.emptyStars = this.MAX_RATE - this.filledStars;
  }

  @Output()
  rateSelected = new EventEmitter<number>();

  onSelectRate(rate: number) {
    if (this.filledStars === 0 ) {
      this.rateSelected.emit(rate);
    }
  }
}
