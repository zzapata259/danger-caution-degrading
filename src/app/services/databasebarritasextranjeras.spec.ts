import { TestBed } from '@angular/core/testing';

import { BarritasExtranjerasService } from './databasebarritasextranjeras';

describe('DatababarritasEetranjeras', () => {
  let service: BarritasExtranjerasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BarritasExtranjerasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
