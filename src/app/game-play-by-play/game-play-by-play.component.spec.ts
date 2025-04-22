import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayByPlayComponent } from './game-play-by-play.component';

describe('GamePlayByPlayComponent', () => {
  let component: GamePlayByPlayComponent;
  let fixture: ComponentFixture<GamePlayByPlayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GamePlayByPlayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamePlayByPlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
