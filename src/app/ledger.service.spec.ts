import {
  beforeEachProviders,
  it,
  describe,
  expect,
  inject
} from '@angular/core/testing';
import { LedgerService } from './ledger.service';

describe('Ledger Service', () => {
  beforeEachProviders(() => [LedgerService]);

  it('should ...',
      inject([LedgerService], (service: LedgerService) => {
    expect(service).toBeTruthy();
  }));
});
