import {
  beforeEachProviders,
  describe,
  expect,
  it,
  inject
} from '@angular/core/testing';
import { NgLedgerUiAppComponent } from '../app/ng-ledger-ui.component';

beforeEachProviders(() => [NgLedgerUiAppComponent]);

describe('App: NgLedgerUi', () => {
  it('should create the app',
      inject([NgLedgerUiAppComponent], (app: NgLedgerUiAppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should have as title \'ng-ledger-ui works!\'',
      inject([NgLedgerUiAppComponent], (app: NgLedgerUiAppComponent) => {
    expect(app.title).toEqual('ng-ledger-ui works!');
  }));
});
