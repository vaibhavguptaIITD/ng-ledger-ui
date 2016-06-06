import { NgLedgerUiPage } from './app.po';

describe('ng-ledger-ui App', function() {
  let page: NgLedgerUiPage;

  beforeEach(() => {
    page = new NgLedgerUiPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ng-ledger-ui works!');
  });
});
