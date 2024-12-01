import { Component, Host, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { List, ListService } from '../list.service';
import { User, UserService } from '../user.service';
import { Card, CardService } from '../card.service';
import { ListDisplayComponent } from '../list-display/list-display.component';
import { CardCreatePopupComponent } from '../card-popup/card.create-popup.component';
import { CardDeletePopupComponent } from '../card-popup/card.delete-popup.component';
import { CardEditPopupComponent } from '../card-popup/card.edit-popup.component';
import { CardMovePopupComponent } from '../card-popup/card.move-popup.component';
import { Board } from '../board.service';

@Component({
  selector: 'app-card-display',
  imports: [
    FormsModule,
    CardCreatePopupComponent,
    CardEditPopupComponent,
    CardMovePopupComponent,
    CardDeletePopupComponent
  ],
  standalone: true,
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.css'
})
export class CardDisplayComponent {
  @Input() currentList: List | null = null;
  @Input() activeUser: User | null = null;
  @Input() selectedBoard: Board | null = null;
  cards: Card[] = []; 
  users: User[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  
  @ViewChild('cardCreatePopup') cardCreatePopup!: CardCreatePopupComponent;
  @ViewChild('cardEditPopup') cardEditPopup!: CardEditPopupComponent;
  @ViewChild('cardMovePopup') cardMovePopup!: CardMovePopupComponent;
  @ViewChild('cardDeletePopup') cardDeletePopup!: CardDeletePopupComponent;

  constructor(@Host() private listDisplay: ListDisplayComponent, 
    private listService: ListService, 
    private cardService: CardService, 
    private userService: UserService) {}

  ngOnInit(): void {
    if(this.currentList && this.currentList.cardsId[0]){
      this.isLoading = true;
      this.errorMessage = null;

      this.userService.getUsers().subscribe({
        next: (user) => {
          this.users = user;
          
          this.cards = [];

          this.currentList!.cardsId.forEach((id) => {
            this.cardService.getCard(id).subscribe({
              next: (card) => {
                this.isLoading = false; 
                this.cards.push(card);
                this.isLoading = this.cards.length !== this.currentList!.cardsId.length;
                if (!this.isLoading) this.cards = this.cards.sort((a, b) => a.listId - b.listId); 
              },
              error: (error) => {
                this.isLoading = false;
                this.errorMessage = 'Failed to load cards';
              }
            });
          })
        }, 
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load users';
        }
      });
    } else {
      this.isLoading = false; 
    }
  }

  getUserName(userId: number): string { 
    const user = this.users.find(user => user.id === userId); 
    return user ? user.name : 'Unknown';
  }

  showButtonContainer(cardUserId: number): boolean { 
    return this.activeUser?.isAdmin || this.activeUser?.id === cardUserId; 
  }

  addCard(): void { 
    this.cardCreatePopup.show();
  }

  editCard(card: Card): void { 
    this.cardEditPopup.show(card);
  } 
  
  moveCard(card: Card): void { 
    this.cardMovePopup.show(card);
  } 
  
  deleteCard(card: Card): void { 
    this.cardDeletePopup.show(card);
  }

  refreshTwoLists(newList: List){
    this.getCards();
  }

  getCards(): void { 
    this.isLoading = true;
    this.cards = [];
    this.errorMessage = null;

    if(this.activeUser && this.currentList){
      this.userService.getUsers().subscribe({
        next: (user) => {
          this.users = user;
          this.listService.getList(this.currentList!.listId).subscribe({
            next: (list) => {
              if(list.cardsId[0]) {
                list.cardsId.forEach((id) => {
                  this.cardService.getCard(id).subscribe({
                    next: (card) => {
                      this.isLoading = false; 
                      this.cards.push(card);
                      this.isLoading = this.cards.length !== list.cardsId.length;
                      if (!this.isLoading) this.cards = this.cards.sort((a, b) => a.listId - b.listId); 
                    },
                    error: (error) => {
                      this.isLoading = false;
                      this.errorMessage = 'Failed to load cards';
                    }
                  });
                })
              } else {
                this.isLoading = false; 
              }
            },
            error: (error) => {
              this.isLoading = false;
              this.errorMessage = 'Failed to load list';
            }
          });
        }, 
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load users';
        }
      });
    }
  }

  refreshCardLists(newList: List): void { 
    this.getCards(); 
    this.refreshCardDisplayComponent(newList); 
  } 
  
  private refreshCardDisplayComponent(list: List): void { 
    // Assuming this method is available in ListDisplayComponent 
    const parent = this.listDisplay; 
    parent.refreshCardDisplayComponent(list); 
  }
}
