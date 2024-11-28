import { Component, ViewChild } from '@angular/core';
import { UserDropdownComponent } from './user-dropdown/user-dropdown.component';
import { BoardDropdownComponent } from './board-dropdown/board-dropdown.component';
import { BoardPopupComponent } from './board-popup/board-popup.component';
import { User } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [UserDropdownComponent, BoardDropdownComponent, BoardPopupComponent],
  standalone: true
})
export class AppComponent {
  title = 'dashboard';
  selectedUser: User | null = null;

  @ViewChild('boardPopup') boardPopup!: BoardPopupComponent;

  onUserChange(user: User | null): void { 
    this.selectedUser = user; 
    console.log('Selected User:', this.selectedUser); // Log the selected user to the console 
  }

  openPopup(): void { 
    this.boardPopup.show(); 
  } 
  
  onConfirm(): void { 
    console.log('Board created.'); // Handle the confirmed board title (e.g., create a new board) 
  } 
  
  onCancel(): void { 
    console.log('Popup cancelled'); 
  }
}
