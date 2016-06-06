export class NgLedgerUiPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ng-ledger-ui-app h1')).getText();
  }
}
