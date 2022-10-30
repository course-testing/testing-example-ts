import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class TestPageComponentHarness extends ComponentHarness {
  static hostSelector = 'form';

  getElement(dataSelector: string): Promise<TestElement | null> {
    return this.locatorForOptional(makeDataSelector(dataSelector))();
  }

  async clickElement(dataSelector: string): Promise<void> {
    const element = await this.getElement(dataSelector);
    return element?.click();
  }
}

const makeDataSelector = (selector: string) => `[data-selector="${selector}"]`;
