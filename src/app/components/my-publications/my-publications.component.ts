/**
 * @fileoverview MyPublicationsCompoent, se implementan metodos para obtener las
 * publicaciones que dio de alta el usuario logeado
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento metodos obtener las publicaciones del usuario logeado
 *
 * La primara version de MyPublicationsCompoent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { AuthService } from 'src/app/service/auth.service';
import { NewInterface } from 'src/app/models/new';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-my-publications',
  templateUrl: './my-publications.component.html',
  styleUrls: ['./my-publications.component.css']
})
export class MyPublicationsComponent implements OnInit {

  public userUid = '';
  public newsUser: NewInterface[] = [];
  public errorMes = '';

  constructor(private _dataApi: DataApiService,
    private _authService: AuthService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner();

    this.getCurrentUser();

    this.getAllNewsUser();
  }

  /**
   * run spinner
  */
  public spinner(): void {
    /** spinner starts on init */
    this.spinnerService.show();
  }

  /**
   * usuario actual
  */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( data => {
      if (data) {
        this.userUid = data.uid;
      }
    });
  }

  /**
   * obtener las publicaciones del usuario logeado
  */
  public getAllNewsUser() {
    let cont = 0;
    this._dataApi.getAllNews().subscribe( news => {
      this.spinnerService.hide();
      if (news.length > 0) {
        for (const i in news) {
          if (news[i].userUid === this.userUid) {
            this.newsUser[cont] = news[i];
            cont++;
          }
        }

        if (this.newsUser.length === 0) {
          this.errorMes = 'No tienes ninguna publicacion';
        } else {
          this.errorMes = '';
        }
        console.log(this.newsUser);
      } else {
        this.errorMes = 'No tienes ninguna publicacion';
      }
    });
  }

  /**
   * actualizar noticias
  */
  public onPreUpdateNew( newData: NewInterface) {
    this._dataApi.selectedNew = Object.assign({}, newData);
  }

  /**
   * eliminar noticia
  */
  public onDeleteNew( idNew: string ): void {
    const confirmation = confirm('Deseas eliminarlo?');
    if (confirmation) {
      this._dataApi.deleteNew( idNew );
    }
  }

}
