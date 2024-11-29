import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardUpdatePopupComponent } from './board.create-popup.component';

describe('BoardCreatePopupComponent', () => {
  let component: BoardUpdatePopupComponent;
  let fixture: ComponentFixture<BoardUpdatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardUpdatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardUpdatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});