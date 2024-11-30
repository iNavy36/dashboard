import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCreatePopupComponent } from './card.create-popup.component';

describe('CardCreatePopupComponent', () => {
  let component: CardCreatePopupComponent;
  let fixture: ComponentFixture<CardCreatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCreatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardCreatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
