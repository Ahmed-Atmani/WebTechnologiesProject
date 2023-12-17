import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBestsellersComponent } from './new-bestsellers.component';

describe('NewBestsellersComponent', () => {
  let component: NewBestsellersComponent;
  let fixture: ComponentFixture<NewBestsellersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewBestsellersComponent]
    });
    fixture = TestBed.createComponent(NewBestsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
