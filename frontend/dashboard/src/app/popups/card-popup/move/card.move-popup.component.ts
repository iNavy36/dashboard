import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../../../services/user/user.service';
import { List, ListService } from '../../../services/list/list.service';
import { Card, CardService } from '../../../services/card/card.service';
import { Board } from '../../../services/board/board.service';

@Component({
  selector: 'app-card-move-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './card.move-popup.component.html',
  styleUrl: '../card-popup.component.css'
})
export class CardMovePopupComponent {
  isVisible = false;
  isLoading = false;
  errorMessage = '';
  content = '';
  @Input() activeUser: User | null = null;
  @Input() currentList: List | null = null;
  @Input() selectedBoard: Board | null = null;
  newList: List | null = null;
  currentCard: Card | null = null;
  lists: List[] = [];
  
  @Output() confirmEvent = new EventEmitter<List>();
  @Output() cancelEvent = new EventEmitter<void>();
  
  constructor(private http: HttpClient, private listService: ListService, private cardService: CardService) {}

  init(): Promise<void> { 
    this.isLoading = true;
    this.lists = [];
    this.errorMessage = '';

    return new Promise((resolve, reject) => {
      if(this.selectedBoard && this.selectedBoard.listsId[0]){
        let completedRequests = 0;
        this.selectedBoard.listsId.forEach((id) => {
          this.listService.getList(id).subscribe({
            next: (list) => {
              this.lists.push(list);
              completedRequests++;
              if (completedRequests === this.selectedBoard!.listsId.length) {
                this.isLoading = false;
                this.lists = this.lists.sort((a, b) => a.listId - b.listId); 
                resolve();
              }
            },
            error: (error) => {
              this.isLoading = false;
              this.errorMessage = 'Failed to load lists';
              reject(error);
            }
          });
        })
      } else {
        this.isLoading = false;
        resolve();
      }
    });
  }

  isEligible(): boolean {
    return (this.newList !== null && this.currentList?.listId !== this.newList.listId);
  }

  async show(card: Card): Promise<void> {
    this.currentCard = card;
    this.content = this.currentCard.content;
    try { 
      await this.init(); 
      this.isVisible = true;
    } catch (error) {
      console.error('Error loading data: ', error);
    }
  }

  hide(): void {
    this.isVisible = false;
    this.content = '';
  }

  confirm(): void {
    if (this.activeUser && this.currentList && this.currentCard && this.newList) {
      const payload = { 
        "user_id": this.activeUser.id, 
        "list_id": this.newList.listId,
        "content": this.content
      };
      this.cardService.moveCard(this.currentCard.cardId, payload).subscribe({ 
        next: () => { 
          this.confirmEvent.emit(this.newList!); 
          this.hide(); 
        }, error: (error) => { 
          console.error('Error moving card to new list: ', error); 
        } 
      }); 
    }
  }
  
  cancel(): void {
    this.cancelEvent.emit();
    this.hide();
  }
}