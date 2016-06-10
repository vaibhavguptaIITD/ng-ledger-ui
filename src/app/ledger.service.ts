import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import * as moment from 'moment';

@Injectable()
export class LedgerService {



  constructor(private http: Http) {}

  // public currentExpenseAmount() {
  //   var fromDate = moment().startOf('month').toDate(),
  //   toDate = new Date();
  //   return this.expenseAmount(fromDate, toDate);
  // }

  public expenses(fromDate: Date, toDate: Date, grep: string){
    return this.transactionsPerAccount('expenses', fromDate, toDate)
    .filter((expense: any) => {
      var postings = expense.postings;
      return this.includeExpense(postings);
    })
    .filter((expense: any) => {
      var postings = expense.postings;
      return this.grepExpense(postings, grep);
    });
  }

  private includeExpense(postings){
    return !postings.find(posting => {
      var account = posting.account;
      return account.indexOf('EMI') != -1 || account.indexOf('Rent') != -1;
    });
    
  }

  private grepExpense(postings, grep){
    if(!grep){
      return true;
    }
    return !!postings.find(posting => {
      var account = posting.account;
      return account.indexOf(grep) != -1;
    });
  }

  // public expenseAmount(fromDate: Date, toDate: Date){
  //   return this.expensesPostings(fromDate, toDate)
  //   .reduce(this.addPosting, 0); 
  // }

  // public balance(): Observable<any>{
  //   return this.http.get('/service/balance').flatMap(response => {
  //     return Observable.from(response.json());
  //   });
  // }

  // public savings(from: Date, to: Date){}

  // public expensesPostings(fromDate: Date, toDate: Date){
  //   return this.postingsPerAccount('expenses', fromDate, toDate)
  //   .filter(posting => {
  //     return posting.account.indexOf('EMI') == -1;
  //   })
  //   .filter(posting => {
  //     return posting.account.indexOf('Rent') == -1;
  //   })
  //   .share();
  // }



  // public expensesDining(fromDate: Date, toDate: Date){
  //   return this.expensesPostings(fromDate, toDate)
  //   .filter(posting => {
  //     return posting.account.indexOf('Dining') != -1;
  //   });
  // }

  // public assets(){
  //   return this.balance().filter(function(entry){
  //     return entry.account.fullname.indexOf('Asset') != -1;
  //   });
  // }

  // public pettyCash(){

  // }

  // public sodexo(){

  // }



  // public cashSpent(fromDate: Date, toDate: Date){
  //   return this.postingsPerAccount('cashExpense', fromDate, toDate)
  //   .filter(posting => {
  //     return posting.commodity.amount < 0;
  //   })
  //   .reduce(this.addPosting, 0);

  // }



  // private postingsPerAccount(account: string, fromDate: Date, toDate: Date){
   
  //   return this.transactionsPerAccount(account, fromDate, toDate)
  //   .map(function(entry){
  //     console.log(entry);
  //     return entry;
  //   })
  //   .pluck('postings')
  //   .flatMap((posting: Array<any>) => {
  //     return Observable.from(posting);
  //   });
  // }

  private transactionsPerAccount(account: string, fromDate: Date, toDate: Date){
    var fromDateStr = moment(fromDate).format('DD-MM-YYYY'),
    toDateStr = moment(toDate).format('DD-MM-YYYY');
    return this.http.get(`/service/${account}/${fromDateStr}/${toDateStr}`)
    .flatMap(response => {
      return Observable.from(response.json());
    })
  }

  public balance(){
    return sendRequest('balance');
  }

  public register(){
    return sendRequest('register');
  }

  public expenses(){
    return this.register()
    .filter((entry: any) => {
      return containsExpense(entry);
    });
  }

  private containsExpense(entry: any){
    !!entry.postings.find(function(posting){
      return posting.account.indexOf('Expenses') != 1;
    });
  }

  private sendRequest(query: string){
     return this.http.get(`/service/${query}`)
    .flatMap(response => {
      return Observable.from(response.json());
    }); 
  }



  // private addPosting(prev, posting){
  //   return prev + posting.commodity.amount;
  // }

}
