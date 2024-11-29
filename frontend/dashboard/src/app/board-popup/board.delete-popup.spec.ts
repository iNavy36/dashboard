import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDeletePopupComponent } from './board.delete-popup.component';

describe('BoardCreatePopupComponent', () => {
  let component: BoardDeletePopupComponent;
  let fixture: ComponentFixture<BoardDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDeletePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
