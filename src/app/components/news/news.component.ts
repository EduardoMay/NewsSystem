/**
 * @fileoverview NewsComponent, se implementan diferentes metodos donde se consume la servicio
 * de DataApiService, en este componente solo se onbtienen las noticias
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se obtienen las noticias mediante el servicio getAllNews()
 *
 * La primara version de NewsComponent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { AlertInterface } from 'src/app/models/alert';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news = []; // se guardan todas las noticias obtenidas
  public alert: AlertInterface; // si existe algun error

  constructor(private _dataApi: DataApiService) { }

  ngOnInit() {
    /**
     * se obtiene todas las noticias
    */
    this._dataApi.getAllNews().subscribe( news => {
      if ( news.length > 0 ) {
        console.log('Status 200');
        this.news = news;
      } else {
        console.log('Status 500');
        this.alert = {
          mensaje: 'Error en el servidor Firebase',
          descripcion: 'Error al obtener registros de la base de datos...',
          tipo: 'danger',
          status: 500
        };
      }
    });
  }

}
