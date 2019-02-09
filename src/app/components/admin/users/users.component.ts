import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UsersApiService } from 'src/app/service/users-api.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  @ViewChild('btnClose') btnClose: ElementRef;
  public users: UserInterface[] = [];
  public role = '';

  public userUid = '';
  public nameUser = '';

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

  public getDataUser(id: string, name: string){
    this.userUid = id;
    this.nameUser = name;
    console.log(this.userUid);
  }

  public updateUser() {
    console.log(this.role);
    if (this.role === 'miembro') {
      const data: UserInterface = {
        roles: {
          miembro: true
        }
      };

      this._usersApiService.updateRoleUser(this.userUid, data);
    } else if (this.role === 'editor') {
      const data: UserInterface = {
        roles: {
          editor: true
        }
      };

      this._usersApiService.updateRoleUser(this.userUid, data);
    } else if (this.role === 'admin') {
      const data: UserInterface = {
        roles: {
          admin: true
        }
      };

      this._usersApiService.updateRoleUser(this.userUid, data);
    }

    this.role = '';
    this.btnClose.nativeElement.click(); // cierra el modal
  }

}
