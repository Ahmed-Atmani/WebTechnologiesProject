import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAccountComponent } from './add-edit-account.component';

describe('AddEditAccountComponent', () => {
  let component: AddEditAccountComponent;
  let fixture: ComponentFixture<AddEditAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditAccountComponent]
    });
    fixture = TestBed.createComponent(AddEditAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
