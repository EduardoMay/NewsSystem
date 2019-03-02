/**
 * @fileoverview ListNewsComponent, se implementan varios metodos para obtener todas
 * las noticias.
 * Cada usuario logeado tiene un permiso asignado('Usuario', 'editor', 'admin')
 * -Los 'usuarios', no tienen permiso para entrar a esta pagina
 * -Los 'editores' solo pueden editar, actualizar y eliminar sus noticias
 * -Los 'administradores' pueden editar y eliminar todas las noticias
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento diferentes metodos para obtener las noticias, editarlas, acutalizarlas y eliminarlas
 *
 * La primara version de ListNewsComponent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { NewInterface } from 'src/app/models/new';
import { AuthService } from 'src/app/service/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  public news: NewInterface[] = []; // se guarda todas las noticias
  public isAdmin: any = null; // si el usaurio es admin
  public userUid = null; // id del usuario
  public pageActual = 1; // ngx-pagination - pagina donde se inicia

  constructor(private _dataApi: DataApiService,
    private _authService: AuthService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getListNews();

    this.spinnerService.show();
  }

  /**
   * se observa si el usuario esta autentificado
  */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( auth => {
      if (auth) {
        this.userUid = auth.uid;
        // console.log(this.userUid);
        this._authService.isUserAdmin( this.userUid ).subscribe( userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
        });
      }
    });
  }

  /**
   * Obtener todas las noticias
  */
  public getListNews() {
    this._dataApi.getAllNews().subscribe( news => {
      // console.log('noticias', news);
      this.spinnerService.hide();
      this.news = news;
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
