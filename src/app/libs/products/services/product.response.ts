export interface ProductResponse {
  readonly id: string;
  readonly title: string;
  readonly price: number,
  readonly description: string,
  readonly category: string,
  readonly image: string,
  readonly rating: {
    readonly rate: number,
    readonly count: number
  }
}
