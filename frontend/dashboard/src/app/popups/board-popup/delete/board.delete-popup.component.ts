import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../../services/user/user.service';
import { Board, BoardService } from '../../../services/board/board.service';

@Component({
    selector: 'app-board-delete-popup',
    templateUrl: './board.delete-popup.component.html',
    styleUrls: ['../board-popup.component.css'],
    imports: [
      FormsModule
    ],
    standalone: true
  })
export class BoardDeletePopupComponent {
  isVisible = false;
  boardTitle = '';
  @Input() activeUser: User | null = null;  
  @Input() selectedBoard: Board | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient, private boardService: BoardService) {}

  show(): void {
    if (this.selectedBoard) { 
        this.boardTitle = this.selectedBoard.name;
    } 
    this.isVisible = true; 
  }

  hide(): void {
    this.isVisible = false;
    this.boardTitle = '';
  }

  confirm(): void {
    if (this.activeUser && this.selectedBoard) { 
      const payload = { 
        "user_id": this.activeUser.id, 
        "board_title": this.boardTitle 
      }; 
      this.boardService.deleteBoard(this.selectedBoard.id, payload).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error deleting board:', error); 
        } 
      }); 
    }
  }

  cancel(): void { 
    this.cancelEvent.emit(); 
    this.hide(); 
  }
}