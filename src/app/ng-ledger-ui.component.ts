import { Component, ViewContainerRef } from '@angular/core';
import './rxjs-operators';
import { HTTP_PROVIDERS } from '@angular/http';
import { LedgerService } from './ledger.service';
import { CurrentExpenseComponent } from './current-expense/current-expense.component';
import { BalanceComponent } from './balance/balance.component';

@Component({
  moduleId: module.id,
  selector: 'ng-ledger-ui-app',
  templateUrl: 'ng-ledger-ui.component.html',
  styleUrls: ['ng-ledger-ui.component.css'],
  providers: [HTTP_PROVIDERS, LedgerService],
  directives: [CurrentExpenseComponent, BalanceComponent]
})
export class NgLedgerUiAppComponent {
  title = 'ng-ledger-ui works!';

  public constructor(public viewContainerRef:ViewContainerRef) {
    
  }
}
