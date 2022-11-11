import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AnalyticsDto } from './analytics.dto';
import { GoogleAnalyticsService } from './google-analytics.service';
import { GoogleAnalyticsServiceModule } from './google-analytics-service.module';
import { ANALYTICS_SERVICE, AnalyticsService } from './analytics.service';

describe('GoogleAnalyticsService', () => {
  let service: AnalyticsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule, GoogleAnalyticsServiceModule ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ANALYTICS_SERVICE);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return product list', () => {
    const response = {};

    const analiticsDto: AnalyticsDto = {
      type: 'CLICK',
      data: {
        param1: 'test'
      }
    };

    service.add(analiticsDto).subscribe();

    const req = httpTestingController.expectOne('https://analytics.free.beeceptor.com/my/api/path');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({ type: 'CLICK', data: { param1: 'test' }});

    req.flush(response, {
      status: 201,
      statusText: 'Created',
    });
  });
});
