import { Directive, HostListener, Inject, Input } from '@angular/core';
import { switchMap, take } from 'rxjs/operators';
import { ANALYTICS_SERVICE, AnalyticsService } from '../../services/analytics/analytics.service';
import { APPLICATION_CONTEXT, ApplicationContext } from '../../services/context/application-context';
import { CLOCK, Clock } from '../../services/clock/clock';
import { ApplicationContextModel } from '../../../products/models/application-context.model';


@Directive({
  selector: '[appSendAnalyticsOnClick]',
})
export class SendAnalyticsOnClickDirective {
  constructor(
    @Inject(ANALYTICS_SERVICE) private _addsAnalytics: AnalyticsService,
    @Inject(APPLICATION_CONTEXT) private _getsContextData: ApplicationContext,
    @Inject(CLOCK) private _currentTime: Clock,
  ) {}

  @Input('appSendAnalyticsOnClick') prefix!: string | null;

  @HostListener('click')
  onClick(): void {
    this._getsContextData
      .get()
      .pipe(
        switchMap((context: ApplicationContextModel) =>
          this._addsAnalytics.add({
            type: 'click',
            data: {
              elementName: this.prefix,
              partnerId: context.partnerId,
              timestamp: this._currentTime.toTimeString()
            },
          })
        ),
        take(1)
      )
      .subscribe()
  }
}
