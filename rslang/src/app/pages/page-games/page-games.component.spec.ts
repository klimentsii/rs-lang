import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageGamesComponent } from './page-games.component';

describe('PageGamesComponent', () => {
  let component: PageGamesComponent;
  let fixture: ComponentFixture<PageGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
