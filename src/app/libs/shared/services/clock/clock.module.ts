import { NgModule } from '@angular/core';
import { CLOCK } from './clock';
import { CurrentTime } from './current-time';

@NgModule({
  providers: [{
    provide: CLOCK,
    useClass: CurrentTime,
  }]
})
export class ClockModule {}
