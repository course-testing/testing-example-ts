export interface ProductModel {
  readonly id: string;
  readonly title: string;
  readonly price: {
    amount: number,
    currency: string,
  },
  readonly description: string,
  readonly category: string,
  readonly image: string,
  readonly rating: {
    readonly rate: number,
    readonly count: number
  }
}
