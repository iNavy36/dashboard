import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../../services/user/user.service';
import { List } from '../../../services/list/list.service';
import { Card, CardService } from '../../../services/card/card.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-card-edit-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './card.edit-popup.component.html',
  styleUrl: '../card-popup.component.css'
})
export class CardEditPopupComponent {
  isVisible = false;
  content = '';
  private cardUrl = environment.apiUrl + '/card';
  @Input() activeUser: User | null = null;
  @Input() currentList: List | null = null;
  currentCard: Card | null = null;
  
  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();
  
  constructor(private http: HttpClient, private cardService: CardService) {}

  show(card: Card): void {
    this.isVisible = true;
    this.currentCard = card;
    this.content = this.currentCard.content;
    console.log(card);
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
      this.cardService.editCard(this.currentCard.cardId, payload).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error updating card:', error); 
        } 
      }); 
    }
  }
  
  cancel(): void {
    this.cancelEvent.emit();
    this.hide();
  }
}