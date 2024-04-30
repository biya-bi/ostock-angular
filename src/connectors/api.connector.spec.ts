import { TestBed } from '@angular/core/testing';

import { ApiConnector } from './api.connector';

describe('ApiConnector', () => {
  let connector: ApiConnector;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    connector = TestBed.inject(ApiConnector);
  });

  it('should be created', () => {
    expect(connector).toBeTruthy();
  });
});
