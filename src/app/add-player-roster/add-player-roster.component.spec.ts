import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerRosterComponent } from './add-player-roster.component';

describe('AddPlayerRosterComponent', () => {
  let component: AddPlayerRosterComponent;
  let fixture: ComponentFixture<AddPlayerRosterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddPlayerRosterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddPlayerRosterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
