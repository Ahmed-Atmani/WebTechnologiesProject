import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCartComponent } from './checkout-cart.component';

describe('CheckoutCartComponent', () => {
  let component: CheckoutCartComponent;
  let fixture: ComponentFixture<CheckoutCartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckoutCartComponent]
    });
    fixture = TestBed.createComponent(CheckoutCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
