import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPreferencesComponent } from './account-preferences.component';

describe('AccountPreferencesComponent', () => {
  let component: AccountPreferencesComponent;
  let fixture: ComponentFixture<AccountPreferencesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountPreferencesComponent]
    });
    fixture = TestBed.createComponent(AccountPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
