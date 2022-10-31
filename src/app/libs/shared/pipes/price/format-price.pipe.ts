import { Pipe, PipeTransform } from '@angular/core';

type Formatter = (amount: number, currency: string) => string;
type Price = {
  amount: number,
  currency: string
};

@Pipe({
  name: 'formatPrice',
})
export class FormatPricePipe implements PipeTransform {
  private readonly _map = new Map<string, Formatter>([
    ['PLN', (amount: number, currency: string) => `${amount} zł`],
    ['USD', (amount: number, currency: string) => `$${amount}`]
  ]);

  private readonly _defaultFormatter = (amount: number, currency: string) => `${amount} ${currency}`;

  constructor() {}

  transform(price: Price): string {
    const formatter = this._map.get(price.currency);
    return formatter ? formatter(price.amount, price.currency) : this._defaultFormatter(price.amount, price.currency);
  }
}
