import { Component, OnInit } from '@angular/core';
import { UsersApiService } from 'src/app/service/users-api.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  public users: UserInterface[] = [];

  constructor(private _usersApiService: UsersApiService) { }

  ngOnInit() {
    this.getListUsers();
  }

  public getListUsers() {
    this._usersApiService.getAllUsers().subscribe( users => {
      this.users = users;
      console.log(users);
    });
  }

}
