import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayEntryFormComponent } from './play-entry-form.component';

describe('PlayEntryFormComponent', () => {
  let component: PlayEntryFormComponent;
  let fixture: ComponentFixture<PlayEntryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayEntryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayEntryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
