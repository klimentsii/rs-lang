import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameAudioCallComponent } from './game-audio-call.component';

describe('GameAudioCallComponent', () => {
  let component: GameAudioCallComponent;
  let fixture: ComponentFixture<GameAudioCallComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameAudioCallComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameAudioCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
