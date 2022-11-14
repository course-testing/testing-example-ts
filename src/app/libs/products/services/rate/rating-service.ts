import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';

export const RATING_SERVICE = new InjectionToken<RatingService>('RATING_SERVICE');

export interface RatingService {
  add(rate: number): Observable<void>;
}
