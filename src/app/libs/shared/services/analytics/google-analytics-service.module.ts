import { NgModule } from '@angular/core';
import { ANALYTICS_SERVICE } from './analytics.service';
import { GoogleAnalyticsService } from './google-analytics.service';

@NgModule({
  providers: [
    GoogleAnalyticsService,
    {
      provide: ANALYTICS_SERVICE,
      useExisting: GoogleAnalyticsService,
    }
  ]
})
export class GoogleAnalyticsServiceModule {
}
