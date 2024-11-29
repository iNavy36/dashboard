import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardCreatePopupComponent } from './board.create-popup.component';

describe('BoardCreatePopupComponent', () => {
  let component: BoardCreatePopupComponent;
  let fixture: ComponentFixture<BoardCreatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardCreatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardCreatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
