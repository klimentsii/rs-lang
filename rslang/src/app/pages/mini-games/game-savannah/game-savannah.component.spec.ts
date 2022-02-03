import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameSavannahComponent } from './game-savannah.component';

describe('GameSavannahComponent', () => {
  let component: GameSavannahComponent;
  let fixture: ComponentFixture<GameSavannahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameSavannahComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameSavannahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
