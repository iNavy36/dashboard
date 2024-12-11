import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../../services/user/user.service';
import { List } from '../../../services/list/list.service';
import { CardService } from '../../../services/card/card.service';

@Component({
  selector: 'app-card-create-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './card.create-popup.component.html',
  styleUrl: '../card-popup.component.css'
})
export class CardCreatePopupComponent {
  isVisible = false;
  content = '';
  @Input() activeUser: User | null = null;
  @Input() currentList: List | null = null;

  @Output() confirmEvent = new EventEmitter<string>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private http: HttpClient, private cardService: CardService) {}

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
      this.cardService.createCard(payload).subscribe({ 
        next: (newCard) => { 
          this.currentList!.cardsId.push(newCard.cardId);
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
