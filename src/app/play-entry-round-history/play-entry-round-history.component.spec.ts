import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayEntryRoundHistoryComponent } from './play-entry-round-history.component';

describe('PlayEntryRoundHistoryComponent', () => {
  let component: PlayEntryRoundHistoryComponent;
  let fixture: ComponentFixture<PlayEntryRoundHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayEntryRoundHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlayEntryRoundHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
