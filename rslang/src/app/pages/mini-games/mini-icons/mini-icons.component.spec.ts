import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniIconsComponent } from './mini-icons.component';

describe('MiniIconsComponent', () => {
  let component: MiniIconsComponent;
  let fixture: ComponentFixture<MiniIconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniIconsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniIconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
