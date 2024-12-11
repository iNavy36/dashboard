import { Component, EventEmitter, Output } from '@angular/core';
import { BoardService, Board } from '../../services/board/board.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-dropdown',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './board-dropdown.component.html',
  styleUrl: '../dropdown.component.css'
})
export class BoardDropdownComponent {
  boards: Board[] = []; 
  selectedBoard: Board | null = null; 
  isLoading = true; 
  errorMessage: string | null = null;

  @Output() selectedBoardChange = new EventEmitter<Board | null>();

  constructor(private boardService: BoardService) {}

  ngOnInit(): void { 
    this.boardService.getBoards().subscribe({ 
      next: (boards) => { 
        this.isLoading = false; 
        if (boards.length === 0) { 
          this.errorMessage = 'No boards available'; 
        } else { 
          boards.forEach((board) => {
            if (board.listsId[0] === null) board.listsId.pop();
          })
          this.boards = boards.sort((a, b) => a.id - b.id); 
          this.selectedBoard = null; 
        } 
      }, 
      error: (error) => { 
        this.isLoading = false; 
        this.errorMessage = 'Failed to load boards'; 
      } 
    }); 
  }

  isDefaultSelected(): boolean { 
    return this.selectedBoard === null;
  }

  onBoardChange(): void { 
    this.selectedBoardChange.emit(this.selectedBoard); 
  }
}
