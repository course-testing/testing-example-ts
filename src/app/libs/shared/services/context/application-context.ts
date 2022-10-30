import { InjectionToken } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApplicationContextModel } from '../../models/application-context.model';

export const APPLICATION_CONTEXT = new InjectionToken<ApplicationContext>('APPLICATION_CONTEXT');

export interface ApplicationContext {
  get(): Observable<ApplicationContextModel>;
}

