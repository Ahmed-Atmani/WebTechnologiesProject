import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageTrackingComponent } from './package-tracking.component';

describe('PackageTrackingComponent', () => {
  let component: PackageTrackingComponent;
  let fixture: ComponentFixture<PackageTrackingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageTrackingComponent]
    });
    fixture = TestBed.createComponent(PackageTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
