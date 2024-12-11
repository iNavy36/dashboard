import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeletePopupComponent } from './list.delete-popup.component';

describe('ListDeletePopupComponent', () => {
  let component: ListDeletePopupComponent;
  let fixture: ComponentFixture<ListDeletePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDeletePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeletePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
