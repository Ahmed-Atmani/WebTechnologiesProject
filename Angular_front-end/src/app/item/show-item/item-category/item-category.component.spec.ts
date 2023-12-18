import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryComponent } from './item-category.component';

describe('ItemCategoryComponent', () => {
  let component: ItemCategoryComponent;
  let fixture: ComponentFixture<ItemCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCategoryComponent]
    });
    fixture = TestBed.createComponent(ItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
