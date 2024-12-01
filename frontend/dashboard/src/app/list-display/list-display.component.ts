import { Component, Input, OnChanges, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ListCreatePopupComponent } from '../list-popup/list.create-popup.component';
import { ListService, List } from '../list.service';
import { Board, BoardService } from '../board.service';
import { User } from '../user.service';
import { ListUpdatePopupComponent } from '../list-popup/list.update-popup.component';
import { ListDeletePopupComponent } from '../list-popup/list.delete-popup.component';
import { CardDisplayComponent } from '../card-display/card-display.component';

@Component({
  selector: 'app-list-display',
  imports: [
    FormsModule,
    ListCreatePopupComponent,
    ListUpdatePopupComponent,
    ListDeletePopupComponent,
    CardDisplayComponent
  ],
  standalone: true,
  templateUrl: './list-display.component.html',
  styleUrl: './list-display.component.css'
})
export class ListDisplayComponent implements OnChanges {
  @Input() selectedBoard: Board | null = null;
  @Input() activeUser: User | null = null;
  lists: List[] = []; 
  isLoading = false;
  errorMessage: string | null = null;
  
  @ViewChild('listCreatePopup') listCreatePopup!: ListCreatePopupComponent;
  @ViewChild('listUpdatePopup') listUpdatePopup!: ListUpdatePopupComponent;
  @ViewChild('listDeletePopup') listDeletePopup!: ListDeletePopupComponent;
  @ViewChildren(CardDisplayComponent) cardDisplayComponents!: QueryList<CardDisplayComponent>;

  constructor(private listService: ListService, private boardService: BoardService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedBoard'] && this.selectedBoard !== null) {
      this.fetchLists(this.selectedBoard.listsId);
    }
  }

  fetchLists(listsId: number[]): void {
    this.isLoading = true;
    this.lists = [];
    this.errorMessage = null;

    if(listsId.length > 0) {
      listsId.forEach((id) => {
        this.listService.getList(id).subscribe({
          next: (list) => {
            this.isLoading = false; 
            this.lists.push(list);
            this.isLoading = this.lists.length !== listsId.length;
            if (!this.isLoading) this.lists = this.lists.sort((a, b) => a.listId - b.listId); 
          },
          error: (error) => {
            this.isLoading = false;
            this.errorMessage = 'Failed to load lists';
          }
        });
      });
    } else {
      this.isLoading = false; 
      this.errorMessage = 'No lists available'; 
    }
  }

  openListCreatePopup(): void {
    this.listCreatePopup.show();
  }

  openListUpdatePopup(list: List): void {
    this.listUpdatePopup.show(list);
  }
  
  openListDeletePopup(list: List): void { 
    this.listDeletePopup.show(list);
  }

  getLists(): void { 
    this.isLoading = true;
    this.lists = [];
    this.errorMessage = null;
    
    if(this.activeUser && this.selectedBoard){
      this.boardService.getBoard(this.selectedBoard.id).subscribe({
        next: (board) => {
          if(board.listsId[0]) {
            board.listsId.forEach((id) => {
              this.listService.getList(id).subscribe({
                next: (list) => {
                  this.isLoading = false; 
                  this.lists.push(list);
                  this.isLoading = this.lists.length !== board.listsId.length;
                  if (!this.isLoading) this.lists = this.lists.sort((a, b) => a.listId - b.listId); 
                },
                error: (error) => {
                  this.isLoading = false;
                  this.errorMessage = 'Failed to load lists';
                }
              });
            })
          } else {
            this.isLoading = false; 
            this.errorMessage = 'No lists available'; 
          }
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'Failed to load board';
        }
      });
    }
  }

  refreshCardDisplayComponent(list: List): void { 
    const cardDisplayComponent = this.cardDisplayComponents.find(component => component.currentList?.listId === list.listId); 
    if (cardDisplayComponent) { 
      cardDisplayComponent.getCards(); 
    }
  }
}
