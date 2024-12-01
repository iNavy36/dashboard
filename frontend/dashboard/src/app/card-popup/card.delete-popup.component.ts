import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../user.service';
import { List } from '../list.service';
import { Card } from '../card.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-card-delete-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './card.delete-popup.component.html',
  styleUrl: './card-popup.component.css'
})
export class CardDeletePopupComponent {
  isVisible = false;
  content = '';
  private cardUrl = environment.apiUrl + '/card';
  @Input() activeUser: User | null = null;
  @Input() currentList: List | null = null;
  currentCard: Card | null = null;
  
  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  show(card: Card): void {
    this.currentCard = card;
    this.content = this.currentCard.content;
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
    this.content = '';
  }

  confirm(): void {
    if (this.activeUser && this.currentList && this.currentCard) { 
      const payload = { 
        "user_id": this.activeUser.id, 
        "list_id": this.currentList.listId,
        "content": this.content
      };
      const options = { 
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json', 
        }), 
        body: payload, 
      };
      this.http.delete(this.cardUrl + "/" + this.currentCard.cardId.toString(), options).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error deleting card:', error); 
        } 
      }); 
    }
  }

  cancel(): void {
    this.cancelEvent.emit();
    this.hide();
  }
}