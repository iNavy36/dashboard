import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user.service';
import { FormsModule } from '@angular/forms';
import { Board } from '../board.service';
import { environment } from '../../environments/environment';

@Component({
    selector: 'app-board-delete-popup',
    templateUrl: './board.delete-popup.component.html',
    styleUrls: ['./board-popup.component.css'],
    imports: [
      FormsModule
    ],
    standalone: true
  })
export class BoardDeletePopupComponent {
  isVisible = false;
  boardTitle = '';
  private boardUrl = environment.apiUrl + '/board';
  @Input() activeUser: User | null = null;  
  @Input() selectedBoard: Board | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

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
      const options = { 
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json', 
        }), 
        body: payload, 
      };
      this.http.delete(this.boardUrl + "/" + this.selectedBoard.id.toString(), options).subscribe({ 
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