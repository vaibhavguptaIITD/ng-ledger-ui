import { Component, OnInit } from '@angular/core';
import { LedgerService } from '../ledger.service';

@Component({
  moduleId: module.id,
  selector: 'app-balance',
  templateUrl: 'balance.component.html',
  styleUrls: ['balance.component.css']
})
export class BalanceComponent implements OnInit {

  constructor(private ledgerService: LedgerService) {}

  balance: any;

  ngOnInit() {
  	//this.ledgerService.balance().subscribe(balance => this.balance = balance);
  }

}
