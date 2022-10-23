import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { AnalyticsDto } from './analytics.dto';

export const ANALYTICS_SERVICE = new InjectionToken<AnalyticsService>('ADDS_ANALYTICS_DTO');

export interface AnalyticsService {
  add(analyticsDto: AnalyticsDto): Observable<void>;
}
