import { Component, ViewChild } from '@angular/core';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { BoardDropdownComponent } from './board-dropdown/board-dropdown.component';
import { BoardCreatePopupComponent } from './board-popup/board.create-popup.component';
import { BoardUpdatePopupComponent } from './board-popup/board.update-popup.component';
import { BoardDeletePopupComponent } from './board-popup/board.delete-popup.component';
import { ListDisplayComponent } from './list-display/list-display.component';
import { User } from './user.service';
import { Board, BoardService } from './board.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [UserDropdownComponent, 
      BoardDropdownComponent, 
      BoardCreatePopupComponent, 
      BoardUpdatePopupComponent,
      BoardDeletePopupComponent,
      ListDisplayComponent
    ],
  standalone: true
})
export class AppComponent {
  title = 'dashboard';
  selectedUser: User | null = null;
  selectedBoard: Board | null = null;

  @ViewChild('boardCreatePopup') boardCreatePopup!: BoardCreatePopupComponent;
  @ViewChild('boardEditPopup') boardUpdatePopup!: BoardUpdatePopupComponent;
  @ViewChild('boardDeletePopup') boardDeletePopup!: BoardDeletePopupComponent;
  @ViewChild(BoardDropdownComponent) boardDropdown!: BoardDropdownComponent;

  constructor(private boardService: BoardService) {}

  onUserChange(user: User | null): void { 
    this.selectedUser = user; 
  }

  onBoardChange(board: Board | null): void { 
    this.selectedBoard = board; 
  }

  openBoardCreatePopup(): void { 
    this.boardCreatePopup.show(); 
  } 
  
  openBoardUpdatePopup(): void { 
    this.boardUpdatePopup.show(); 
  } 
  
  openBoardDeletePopup(): void { 
    this.boardDeletePopup.show(); 
  } 

  getBoards(): void { 
    this.boardService.getBoards().subscribe({ 
      next: (boards) => { 
        if (boards.length === 0) { 
          this.boardDropdown.errorMessage = 'No boards available'; 
        } else { 
          this.boardDropdown.errorMessage = null;
          boards.forEach((board) => {
            if (board.listsId[0] === null) board.listsId.pop();
          })
          this.boardDropdown.boards = boards.sort((a, b) => a.id - b.id); // Sort boards by id 
        }
        this.boardDropdown.selectedBoard = null;
        this.selectedBoard = null;
      }, error: (error) => { 
        console.error('Failed to load boards', error); 
      } 
    }); 
  }
}
