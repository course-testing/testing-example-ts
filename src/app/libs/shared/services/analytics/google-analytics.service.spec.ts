import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AnalyticsDto } from './analytics.dto';
import { GoogleAnalyticsService } from './google-analytics.service';

describe('GoogleAnalyticsService', () => {
  let service: GoogleAnalyticsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        GoogleAnalyticsService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(GoogleAnalyticsService);
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
