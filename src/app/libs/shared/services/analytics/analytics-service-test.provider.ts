import { ANALYTICS_SERVICE } from './analytics.service';
import { of } from 'rxjs';

export const ANALYTICS_SERVICE_TEST_PROVIDER = {
  provide: ANALYTICS_SERVICE,
  useValue: {
    add: () => of(void 0),
  }
}
