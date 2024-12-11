import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../../services/user/user.service';
import { Board } from '../../../services/board/board.service';
import { ListService } from '../../../services/list/list.service';

@Component({
  selector: 'app-list-create-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './list.create-popup.component.html',
  styleUrl: '../list-popup.component.css'
})
export class ListCreatePopupComponent {
  isVisible = false;
  listTitle = '';
  @Input() activeUser: User | null = null;
  @Input() selectedBoard: Board | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient, private listService: ListService) {}

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
      this.listService.createList(payload).subscribe({ 
        next: (newList) => { 
          this.selectedBoard!.listsId.push(newList.listId);
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
