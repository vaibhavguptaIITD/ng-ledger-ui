import { Component, OnInit, ViewChild } from '@angular/core';
import { LedgerService } from '../ledger.service';
import * as moment from 'moment';
import {Ng2Highcharts} from 'ng2-highcharts/ng2-highcharts';
import {DATEPICKER_DIRECTIVES, MODAL_DIRECTVES, BS_VIEW_PROVIDERS, ModalDirective} from 'ng2-bootstrap/ng2-bootstrap';


@Component({
	moduleId: module.id,
	selector: 'app-current-expense',
	templateUrl: 'current-expense.component.html',
	styleUrls: ['current-expense.component.css'],
	directives: [Ng2Highcharts, DATEPICKER_DIRECTIVES, MODAL_DIRECTVES],
	viewProviders:[BS_VIEW_PROVIDERS]
})
export class CurrentExpenseComponent implements OnInit {

	chartOptions = {};
	fromDate: string;
	toDate: string;
	type: string;

	@ViewChild(ModalDirective)
	modal: ModalDirective;



	constructor(private ledgerService: LedgerService) {}

	currentExpense: number;

	modalExpenses: any[];

	ngOnInit() {
		this.fromDate = moment().startOf('month').format('DD-MM-YYYY'),
		this.toDate = moment().format('DD-MM-YYYY');
		this.filterExpense();

	}

	ngAfterViewInit() {

    // available here
	}

	filterExpense(){
		var fromDate = moment(this.fromDate, 'DD-MM-YYYY').toDate(),
		toDate =  moment(this.toDate, 'DD-MM-YYYY').toDate(),
		that = this;
		this.ledgerService.expenses(fromDate, toDate, this.type)
		.groupBy((entry: any) => entry.date)
		.flatMap(group => {
			return group.reduce((prev, curr: any) => {
				prev.x = new Date(curr.date);
				prev.y = prev.y + curr.postings.reduce((prev, curr) => {
					return prev + curr.commodity.amount;
				}, 0);
				prev.entries.push(curr);
				return prev;
			}, {x: null, y: 0, entries: []})
		})
		.toArray().subscribe(data => {
			console.log(data);
			this.chartOptions = {
				chart: {
					type: 'line'
				},
				title: {
					text: 'Expenses'
				},
				xAxis: {
					type: 'datetime',
					title:{
						text: 'Date'
					}
				},
				yAxis: {
					title: {
						text: 'Amount'
					}
				},
				plotOptions: {
					series: {
						cursor: 'pointer',
						point: {
							events: {
								click:  function(e) {
	                               		that.modalExpenses = this.entries;
										that.modal.show()
									}
								}
							},
						marker: {
							lineWidth: 1
						}
					}
				},

				series: [{
					name: 'Expense',
					data: data
				}]
			};
		});
	}

}
