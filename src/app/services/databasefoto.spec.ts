import { TestBed } from '@angular/core/testing';

import { DatabaseFoto } from './databasefoto';

describe('DatabaseService', () => {
  let service: DatabaseFoto;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseFoto);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
