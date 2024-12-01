import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../user.service';
import { List } from '../list.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-card-create-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './card.create-popup.component.html',
  styleUrl: './card-popup.component.css'
})
export class CardCreatePopupComponent {
  isVisible = false;
  content = '';
  private cardUrl = environment.apiUrl + '/card';
  @Input() activeUser: User | null = null;
  @Input() currentList: List | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
    this.content = '';
  }

  confirm(): void {
    if (this.activeUser && this.currentList) { 
      const payload = { 
        "user_id": this.activeUser.id, 
        "list_id": this.currentList.listId,
        "content": this.content
      };
      this.http.post(this.cardUrl, payload).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error creating card:', error); 
        } 
      });
    }
  }

  cancel(): void {
    this.cancelEvent.emit();
    this.hide();
  }
}
