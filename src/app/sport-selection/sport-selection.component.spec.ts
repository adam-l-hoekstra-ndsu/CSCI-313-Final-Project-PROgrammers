import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportSelectionComponent } from './sport-selection.component';

describe('SportSelectionComponent', () => {
  let component: SportSelectionComponent;
  let fixture: ComponentFixture<SportSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SportSelectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
