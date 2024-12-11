import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMovePopupComponent } from './card.move-popup.component';

describe('CardMovePopupComponent', () => {
  let component: CardMovePopupComponent;
  let fixture: ComponentFixture<CardMovePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardMovePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMovePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
