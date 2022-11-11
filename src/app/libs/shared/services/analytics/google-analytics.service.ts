import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { AnalyticsDto } from './analytics.dto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleAnalyticsService implements AnalyticsService {
  constructor(private _httpClient: HttpClient) {
  }

  add(analyticsDto: AnalyticsDto): Observable<void> {
    return of(void 0);
  }
}
