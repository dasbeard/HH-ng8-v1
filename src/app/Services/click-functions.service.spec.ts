import { TestBed } from '@angular/core/testing';

import { ClickFunctionsService } from './click-functions.service';

describe('ClickFunctionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClickFunctionsService = TestBed.get(ClickFunctionsService);
    expect(service).toBeTruthy();
  });
});
