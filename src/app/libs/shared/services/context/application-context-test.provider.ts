import { APPLICATION_CONTEXT } from './application-context';
import { of } from 'rxjs';

export const APPLICATION_CONTEXT_TEST_PROVIDER = {
  provide: APPLICATION_CONTEXT,
  useValue: {
    get: () =>
      of({
        partnerId: '__PARTNER_ID__',
      }),
  },
}
