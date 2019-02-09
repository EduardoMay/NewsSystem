/**
 * @fileoverview UsersComponent, se implementa metodos para obtener todos los usuarios
 * de la base de datos.
 * Cambiar el role de un usuario.
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento diferentes metodos para obtener los usuarios y cambiar el tipo de usuario
 *
 * La primara version de UsersComponent fue escrita por Eduardo May
*/

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
  public users: UserInterface[] = []; // almacena todos los usuarios
  public role = ''; // almacena el nuevo rol

  public userUid = ''; // almacena el id del usuario seleccionado
  public nameUser = ''; // almacena el nombre del usuario del usuario seleccionado

  constructor(private _usersApiService: UsersApiService) { }

  ngOnInit() {
    this.getListUsers(); // obtiene todos los usuarios
  }

  /**
   * obtiene todos los usuarios
  */
  public getListUsers() {
    this._usersApiService.getAllUsers().subscribe( users => {
      this.users = users;
      console.log(users);
    });
  }


  /**
   * obtiene los datos del usuario seleccionado
  */
  public getDataUser(id: string, name: string) {
    this.userUid = id;
    this.nameUser = name;
    console.log(this.userUid);
  }

  /**
   * actualiza el role del usuario seleccionado
  */
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
