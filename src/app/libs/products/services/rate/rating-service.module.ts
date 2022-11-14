import { NgModule } from '@angular/core';
import { RATING_SERVICE } from './rating-service';
import { of } from 'rxjs';

@NgModule({
  providers: [
    {
      provide: RATING_SERVICE,
      useValue: {
        add: (rate: number) => of(void 0)
      },
    }
  ]
})
export class RatingServiceModule {
}
