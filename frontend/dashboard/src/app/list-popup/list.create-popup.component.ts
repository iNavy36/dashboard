import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../user.service';
import { Board } from '../board.service';

@Component({
  selector: 'app-list-create-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './list.create-popup.component.html',
  styleUrl: './list-popup.component.css'
})
export class ListCreatePopupComponent {
  isVisible = false;
  listTitle = '';
  private listUrl = 'http://localhost:8080/list';
  @Input() activeUser: User | null = null;
  @Input() selectedBoard: Board | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
    this.listTitle = '';
  }

  confirm(): void {
    if (this.activeUser && this.selectedBoard) { 
      const payload = { 
        "user_id": this.activeUser.id, 
        "board_id": this.selectedBoard.id,
        "list_title": this.listTitle
      };
      this.http.post(this.listUrl, payload).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error creating list:', error); 
        } 
      }); 
    }
  }

  cancel(): void {
    this.cancelEvent.emit();
    this.hide();
  }
}
