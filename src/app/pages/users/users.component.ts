import { Iusers } from './../../interfaces/iusers';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../shared/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'] 
})
export class UsersComponent implements OnInit {

  public users: Iusers[] = [];
  public filteredUsers: Iusers[] = [];
  public usersToShow: Iusers[] = [];
  public totalPages: number = 0;
  public searchFields = {
    name:'',
    surname: '',
    surname2: '',
    email: ''
  }
  public actualPage = 1;
  public usersPage = 5;

  constructor(private api: ApiService){ }
  
  ngOnInit(): void {
    this.api.getUsers().subscribe((data: any) => {
      this.users = data; 
      this.filteredUsers = [...this.users];
      this.usersToShow = this.filteredUsers.slice(0,5)
      this.totalPages = Math.ceil(this.filteredUsers.length / this.usersPage);

    });
  }

  searchUsers(): void {
    console.log(this.searchFields)
    console.log(this.users)    

    this.filteredUsers = this.users.filter(user => 
      user.name.toLowerCase().includes(this.searchFields.name.toLowerCase()) &&
      user.surname.toLowerCase().includes(this.searchFields.surname.toLowerCase()) &&
      user.surname2.toLowerCase().includes(this.searchFields.surname2.toLowerCase()) &&
      user.email.toLowerCase().includes(this.searchFields.email.toLowerCase())
    );
    
    console.log(this.filteredUsers)
  
    this.totalPages = Math.ceil(this.filteredUsers.length / this.usersPage); 
    this.actualPage = 1;
    this.showPage();
  }
  
  

  showPage(): void {
    const startIndex = (this.actualPage - 1) * this.usersPage;
    const endIndex = Math.min(startIndex + this.usersPage, this.filteredUsers.length);
    this.usersToShow = this.filteredUsers.slice(startIndex, endIndex);
  }

  previousPage(): void {
    if (this.actualPage > 1) {
      this.actualPage--;
      this.showPage();
    }
  }

  nextPage(): void {
    if (this.actualPage < this.totalPages) {
      this.actualPage++;
      this.showPage();
    }
  }
  
}

