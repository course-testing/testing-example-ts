import { Pipe, PipeTransform } from '@angular/core';

type Price = {
  amount: number,
  currency: string
};

@Pipe({
  name: 'formatPrice',
})
export class FormatPricePipe implements PipeTransform {

  transform(price: Price): string {
    return '123.56 zł';
  }
}
