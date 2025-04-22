import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterEditComponent } from './roster-edit.component';

describe('RosterEditComponent', () => {
  let component: RosterEditComponent;
  let fixture: ComponentFixture<RosterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RosterEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RosterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
