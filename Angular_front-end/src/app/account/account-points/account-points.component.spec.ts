import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPointsComponent } from './account-points.component';

describe('AccountPointsComponent', () => {
  let component: AccountPointsComponent;
  let fixture: ComponentFixture<AccountPointsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPointsComponent]
    });
    fixture = TestBed.createComponent(AccountPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
