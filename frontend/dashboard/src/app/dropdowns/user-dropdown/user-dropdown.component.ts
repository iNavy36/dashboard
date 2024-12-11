import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService, User } from '../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['../dropdown.component.css'],
  standalone: true,
  imports: [
    FormsModule
  ]
})
export class UserDropdownComponent implements OnInit {
  users: User[] = [];
  selectedUser: User | null = null;
  isLoading = true;
  errorMessage: string | null = null;

  @Output() selectedUserChange = new EventEmitter<User | null>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.isLoading = false;
        if (users.length === 0) {
          this.errorMessage = 'No users available';
        } else {
          this.users = users;
          this.selectedUser = users.find(user => user.id === 1) || users[0];
          this.selectedUserChange.emit(this.selectedUser);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Failed to load users';
      }
    });
  }

  onUserChange(): void { 
    console.log('Selected User:', this.selectedUser);
    this.selectedUserChange.emit(this.selectedUser); 
  }
}
