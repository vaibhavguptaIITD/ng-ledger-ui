import {
  beforeEach,
  beforeEachProviders,
  describe,
  expect,
  it,
  inject,
} from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { CurrentExpenseComponent } from './current-expense.component';

describe('Component: CurrentExpense', () => {
  let builder: TestComponentBuilder;

  beforeEachProviders(() => [CurrentExpenseComponent]);
  beforeEach(inject([TestComponentBuilder], function (tcb: TestComponentBuilder) {
    builder = tcb;
  }));

  it('should inject the component', inject([CurrentExpenseComponent],
      (component: CurrentExpenseComponent) => {
    expect(component).toBeTruthy();
  }));

  it('should create the component', inject([], () => {
    return builder.createAsync(CurrentExpenseComponentTestController)
      .then((fixture: ComponentFixture<any>) => {
        let query = fixture.debugElement.query(By.directive(CurrentExpenseComponent));
        expect(query).toBeTruthy();
        expect(query.componentInstance).toBeTruthy();
      });
  }));
});

@Component({
  selector: 'test',
  template: `
    <app-current-expense></app-current-expense>
  `,
  directives: [CurrentExpenseComponent]
})
class CurrentExpenseComponentTestController {
}

