import { CLOCK } from './clock';

export const CLOCK_TEST_PROVIDER =         {
  provide: CLOCK,
  useValue: {
    toTimeString: () => ('20:43:06 GMT+0200'),
  }
}
