import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { User } from '../user.service';
import { List, ListService } from '../list.service';
import { Card } from '../card.service';
import { Board } from '../board.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-card-move-popup',
  imports: [
    FormsModule
  ],
  standalone: true,
  templateUrl: './card.move-popup.component.html',
  styleUrl: './card-popup.component.css'
})
export class CardMovePopupComponent {
  isVisible = false;
  isLoading = false;
  errorMessage = '';
  content = '';
  private cardUrl = environment.apiUrl + '/card';
  @Input() activeUser: User | null = null;
  @Input() currentList: List | null = null;
  @Input() selectedBoard: Board | null = null;
  newList: List | null = null;
  currentCard: Card | null = null;
  lists: List[] = [];
  
  @Output() confirmEvent = new EventEmitter<List>();
  @Output() cancelEvent = new EventEmitter<void>();
  
  constructor(private http: HttpClient, private listService: ListService) {}

  init(): void { 
    this.isLoading = true;
    if(this.selectedBoard && this.selectedBoard.listsId[0]){
      this.selectedBoard.listsId.forEach((id) => {
        this.listService.getList(id).subscribe({
          next: (list) => {
            this.isLoading = false; 
            this.lists.push(list);
            this.isLoading = this.lists.length !== this.selectedBoard!.listsId.length;
            if (!this.isLoading) this.lists = this.lists.sort((a, b) => a.listId - b.listId); 
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Failed to load lists';
          }
        });
      })
    }
  }

  isEligible(): boolean {
    return (this.newList !== null && this.currentList?.listId !== this.newList.listId);
  }

  show(card: Card): void {
    this.isVisible = true;
    this.currentCard = card;
    this.content = this.currentCard.content;
    this.lists = []
    this.init();
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
      this.http.put(this.cardUrl + "/" + this.currentCard.cardId.toString() + "/move", payload).subscribe({ 
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