import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUpdatePopupComponent } from './list.update-popup.component';

describe('ListUpdatePopupComponent', () => {
  let component: ListUpdatePopupComponent;
  let fixture: ComponentFixture<ListUpdatePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListUpdatePopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUpdatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
