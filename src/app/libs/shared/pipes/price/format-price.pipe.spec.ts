import { FormatPricePipe } from './format-price.pipe';

describe('FormatPricePipe', () => {
  const given = () => {
    return {
      pipe: new FormatPricePipe(),
    };
  }

  it('should format PLN price', () => {
    const { pipe } = given();

    const formatterPrice = pipe.transform({
      amount: 123.56,
      currency: 'PLN',
    });

    expect(formatterPrice).toEqual('123.56 zł');
  });
});
