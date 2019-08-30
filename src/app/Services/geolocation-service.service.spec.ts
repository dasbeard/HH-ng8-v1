import { TestBed } from '@angular/core/testing';

import { GeolocationServiceService } from './geolocation-service.service';

describe('GeolocationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeolocationServiceService = TestBed.get(GeolocationServiceService);
    expect(service).toBeTruthy();
  });
});
