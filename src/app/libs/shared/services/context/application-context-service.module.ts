import { NgModule } from '@angular/core';
import { ApplicationContextService } from './application-context.service';
import { APPLICATION_CONTEXT } from './application-context';

@NgModule({
  providers: [
    ApplicationContextService,
    {
      provide: APPLICATION_CONTEXT,
      useExisting: ApplicationContextService,
    }
  ]
})
export class ApplicationContextServiceModule {
}
