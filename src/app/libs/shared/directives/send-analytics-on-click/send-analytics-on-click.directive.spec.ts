import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { SendAnalyticsDirectivesModule } from './send-analytics-directives.module';
import { TestPageComponentHarness } from './test-page-component.harness';
import { ANALYTICS_SERVICE } from '../../services/analytics/analytics.service';
import { ANALYTICS_SERVICE_TEST_PROVIDER } from '../../services/analytics/analytics-service-test.provider';
import { APPLICATION_CONTEXT_TEST_PROVIDER } from '../../services/context/application-context-test.provider';
import { CLOCK_TEST_PROVIDER } from '../../services/clock/clock-test.provider';

@Component({
  template: `<form>
    <div [appSendAnalyticsOnClick]="'__PREFIX__'" data-selector="clickable-element"></div>
  </form>`,
})
class TestComponent {}

describe('SendAnalyticsOnClickDirective', () => {
  const given = async () => {
    await TestBed.configureTestingModule({
      imports: [SendAnalyticsDirectivesModule],
      declarations: [TestComponent],
      providers: [
        ANALYTICS_SERVICE_TEST_PROVIDER,
        APPLICATION_CONTEXT_TEST_PROVIDER,
        CLOCK_TEST_PROVIDER,
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(TestComponent);
    const loader = TestbedHarnessEnvironment.loader(fixture);
    const componentHarness = await loader.getHarness(TestPageComponentHarness);

    return {
      click: (dataSelector: string) => componentHarness.clickElement(dataSelector),
      fixture,
      addsAnalyticsServiceAddSpy: spyOn(TestBed.inject(ANALYTICS_SERVICE), 'add').and.callThrough(),
    };
  };

  it('should send analytics on click', async () => {
    const { click, addsAnalyticsServiceAddSpy } = await given();

    await click('clickable-element');

    expect(addsAnalyticsServiceAddSpy).toHaveBeenCalledWith({
      type: 'click',
      data: { elementName: '__PREFIX__', partnerId: '__PARTNER_ID__', timestamp: '20:43:06 GMT+0200'}
    });
  });
});
