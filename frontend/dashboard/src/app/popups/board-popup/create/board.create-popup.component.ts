import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../../services/user/user.service';
import { BoardService } from '../../../services/board/board.service';
@Component({
  selector: 'app-board-create-popup',
  templateUrl: './board.create-popup.component.html',
  styleUrls: ['../board-popup.component.css'],
  imports: [
    FormsModule
  ],
  standalone: true
})
export class BoardCreatePopupComponent {
  isVisible = false;
  boardTitle = '';
  @Input() activeUser: User | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient, private boardService: BoardService) {}

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
    this.boardTitle = '';
  }

  confirm(): void {
    if (this.activeUser) { 
      const payload = { 
        "user_id": this.activeUser.id, 
        "board_title": this.boardTitle 
      }; 
      this.boardService.createBoard(payload).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error creating board:', error); 
        } 
      }); 
    }
  }

  cancel(): void {
    this.cancelEvent.emit();
    this.hide();
  }
}
