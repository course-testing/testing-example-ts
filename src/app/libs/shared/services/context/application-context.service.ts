import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApplicationContext } from './application-context';
import { ApplicationContextModel } from '../../../products/models/application-context.model';

@Injectable()
export class ApplicationContextService implements ApplicationContext {
  get(): Observable<ApplicationContextModel> {
    // call to external API
    return of({
      partnerId: '732793f92e4840c240adb0830b2332d5'
    });
  }
}
