import { ComponentHarness, HarnessQuery, parallel, TestElement } from '@angular/cdk/testing';

export class ProductsComponentHarness extends ComponentHarness {
  static hostSelector = 'app-products-list';

  getElement(dataSelector: string): Promise<TestElement | null> {
    return this.locatorForOptional(makeDataSelector(dataSelector))();
  }

  getElements(selector: string | HarnessQuery<ComponentHarness>): Promise<TestElement[]> {
    return this.locatorForAll(selector)();
  }

  // async getElementsText(selector: string | HarnessQuery<ComponentHarness>): Promise<string[]> {
  //   const elements = await this.getElements(selector);
  //
  //   return parallel(() => elements.map((c) => c.text()));
  // }
  //
  // async getDataSelector(): Promise<string | null> {
  //   return (await this.host()).getAttribute('data-selector');
  // }
  //
  // async clickElement(dataSelector: string): Promise<void> {
  //   const element = await this.getElement(dataSelector);
  //   return element?.click();
  // }
  //
  // async clickElementInsideDataSelector(dataSelector: string, insideQuery: string): Promise<void> {
  //   const element = await this.locatorForOptional(makeDataSelector(dataSelector) + insideQuery)();
  //   return element?.click();
  // }
}

const makeDataSelector = (selector: string) => `[data-selector="${selector}"]`;
