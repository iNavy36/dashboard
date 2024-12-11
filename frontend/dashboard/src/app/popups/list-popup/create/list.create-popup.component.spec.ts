import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreatePopupComponent } from './list.create-popup.component';

describe('ListCreatePopupComponent', () => {
  let component: ListCreatePopupComponent;
  let fixture: ComponentFixture<ListCreatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCreatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCreatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
