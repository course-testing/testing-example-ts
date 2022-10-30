import { InjectionToken } from '@angular/core';

export const CLOCK = new InjectionToken<Clock>('CLOCK');

export interface Clock {
  toTimeString(): string;
}
