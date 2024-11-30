import { Component, Input, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { List, ListService } from '../list.service';
import { User, UserService } from '../user.service';
import { Card, CardService } from '../card.service';
import { CardCreatePopupComponent } from '../card-popup/card.create-popup.component';
import { CardDeletePopupComponent } from '../card-popup/card.delete-popup.component';

@Component({
  selector: 'app-card-display',
  imports: [
    FormsModule,
    CardCreatePopupComponent,
    CardDeletePopupComponent
  ],
  standalone: true,
  templateUrl: './card-display.component.html',
  styleUrl: './card-display.component.css'
})
export class CardDisplayComponent {
  @Input() currentList: List | null = null;
  @Input() activeUser: User | null = null;
  cards: Card[] = []; 
  users: User[] = [];
  isLoading = false;
  errorMessage: string | null = null;
  
  @ViewChild('cardCreatePopup') cardCreatePopup!: CardCreatePopupComponent;
  @ViewChild('cardDeletePopup') cardDeletePopup!: CardDeletePopupComponent;

  constructor(private listService: ListService, private cardService: CardService, private userService: UserService) {}

  ngOnInit(): void {
    if(this.currentList && this.currentList.cardsId[0]){
      this.isLoading = true;
      this.errorMessage = null;

      this.userService.getUsers().subscribe({
        next: (user) => {
          this.users = user;
        }, 
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load users';
        }
      });

      this.cards = [];

      this.currentList.cardsId.forEach((id) => {
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
    console.log(`Edit card with ID ${card.cardId}`); // Implement edit logic here 
  } 
  
  moveCard(card: Card): void { 
    console.log(`Move card with ID ${card.cardId}`); // Implement move logic here 
  } 
  
  deleteCard(card: Card): void { 
    this.cardDeletePopup.show(card);
  }

  getCards(): void { 
    this.isLoading = true;
    this.cards = [];
    this.errorMessage = null;

    if(this.activeUser && this.currentList){
      this.listService.getList(this.currentList.listId).subscribe({
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
    }
  }
}
