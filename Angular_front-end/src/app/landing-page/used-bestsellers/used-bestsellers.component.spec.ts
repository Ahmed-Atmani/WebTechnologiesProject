import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsedBestsellersComponent } from './used-bestsellers.component';

describe('UsedBestsellersComponent', () => {
  let component: UsedBestsellersComponent;
  let fixture: ComponentFixture<UsedBestsellersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsedBestsellersComponent]
    });
    fixture = TestBed.createComponent(UsedBestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
