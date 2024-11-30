import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../user.service';
import { Board } from '../board.service';
import { List } from '../list.service';

@Component({
  selector: 'app-list-update-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './list.update-popup.component.html',
  styleUrl: './list-popup.component.css'
})
export class ListUpdatePopupComponent {
  isVisible = false;
  listTitle = '';
  private listUrl = 'http://localhost:8080/list';
  @Input() activeUser: User | null = null;
  @Input() selectedBoard: Board | null = null;
  currentList: List | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  show(list: List): void {
    this.currentList = list;
    this.listTitle = this.currentList.name;
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
    this.listTitle = '';
  }

  confirm(): void {
    if (this.activeUser && this.selectedBoard && this.currentList) { 
      const payload = { 
        "user_id": this.activeUser.id, 
        "board_id": this.selectedBoard.id,
        "list_title": this.listTitle
      };
      this.http.put(this.listUrl + "/" + this.currentList.listId.toString(), payload).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error updating list:', error); 
        } 
      }); 
    }
  }
  
  cancel(): void {
    this.cancelEvent.emit();
    this.hide();
  }
}