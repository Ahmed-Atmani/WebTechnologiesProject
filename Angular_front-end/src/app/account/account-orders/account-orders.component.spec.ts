import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrdersComponent } from './account-orders.component';

describe('AccountOrdersComponent', () => {
  let component: AccountOrdersComponent;
  let fixture: ComponentFixture<AccountOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountOrdersComponent]
    });
    fixture = TestBed.createComponent(AccountOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
