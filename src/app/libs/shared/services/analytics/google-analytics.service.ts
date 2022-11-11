import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AnalyticsService } from './analytics.service';
import { AnalyticsDto } from './analytics.dto';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GoogleAnalyticsService implements AnalyticsService {
  constructor(private _httpClient: HttpClient) {
  }

  add(analyticsDto: AnalyticsDto): Observable<void> {
    return this._httpClient.post(`https://analytics.free.beeceptor.com/my/api/path`, analyticsDto).pipe(map(() => void 0));
  }
}
