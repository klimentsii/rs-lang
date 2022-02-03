import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameOasisComponent } from './game-oasis.component';

describe('GameOasisComponent', () => {
  let component: GameOasisComponent;
  let fixture: ComponentFixture<GameOasisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameOasisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameOasisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
