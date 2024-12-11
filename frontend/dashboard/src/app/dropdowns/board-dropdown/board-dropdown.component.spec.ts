import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardDropdownComponent } from './board-dropdown.component';

describe('BoardDropdownComponent', () => {
  let component: BoardDropdownComponent;
  let fixture: ComponentFixture<BoardDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardDropdownComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
