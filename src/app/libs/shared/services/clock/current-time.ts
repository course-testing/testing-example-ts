import { Clock } from './clock';

export class CurrentTime implements Clock {
  toTimeString(): string {
    return new Date().toTimeString();
  }
}
