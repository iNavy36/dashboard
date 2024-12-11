import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardDeletePopupComponent } from './card.delete-popup.component';

describe('CardDeletePopupComponent', () => {
  let component: CardDeletePopupComponent;
  let fixture: ComponentFixture<CardDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardDeletePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
