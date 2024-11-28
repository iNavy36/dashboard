import { Component } from '@angular/core';
import { BoardService } from '../board.service';
import { FormsModule } from '@angular/forms';
import { Board } from '../board.service';

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

  constructor(private boardService: BoardService) {}

  ngOnInit(): void { 
    this.boardService.getBoards().subscribe({ 
      next: (boards) => { 
        this.isLoading = false; 
        if (boards.length === 0) { 
          this.errorMessage = 'No boards available'; 
        } else { 
          this.boards = boards; 
          this.selectedBoard = boards.find(board => board.id === 1) || boards[0]; 
        } 
      }, 
      error: (error) => { 
        this.isLoading = false; 
        this.errorMessage = 'Failed to load boards'; 
      } 
    }); 
  }
}
