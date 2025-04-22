import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayEntryComponent } from './game-play-entry.component';

describe('GamePlayEntryComponent', () => {
  let component: GamePlayEntryComponent;
  let fixture: ComponentFixture<GamePlayEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlayEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePlayEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
