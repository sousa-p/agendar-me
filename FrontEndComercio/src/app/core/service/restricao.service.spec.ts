import { TestBed } from '@angular/core/testing';

import { RestricaoService } from './restricao.service';

describe('RestricaoService', () => {
  let service: RestricaoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestricaoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
