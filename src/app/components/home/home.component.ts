/**
 * @fileoverview HomeComponent, se implementa metodos para obtener las noticias y para el
 * uso de ngx-spinner
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento metodos para obtener todas las noticias y el uso de ngx-spinner
 *
 * La primara version de HomeComponent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { NewInterface } from 'src/app/models/new';
import { DataApiService } from 'src/app/service/data-api.service';
import { AlertInterface } from 'src/app/models/alert';
import { NgxSpinnerService } from 'ngx-spinner';

declare var $: any; // para usar el jquery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news = []; // se guardan todas las noticas obtenidas
  public new = '';
  public alert: AlertInterface = {
    active: false
  }; // si existe algun mensage de error

  constructor(private _dataApi: DataApiService,
    private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner(); // inicia el spinner

    $('.carousel').carousel({
      interval: 3000,
      wrap: true
    }); // uso del corousel de bootstrap 4.2

    this.getAllNews();
  }

  /**
   * obtiene todas las noticias
  */
  public getAllNews() {
    this._dataApi.getAllNews().subscribe( news => {
      if (news.length > 0) {
        this.news = news;
        // console.log('Noticias: ', news);
      } else {
        this.alert = {
          mensaje: 'Error en el servidor Firebase',
          descripcion: 'Error al obtener registros de la base de datos...',
          tipo: 'danger',
          status: 500,
          active: true
        };
        // console.log(this.alert);
      }
    });
  }

  /**
   * run spinner
  */
  public spinner(): void {
    /** spinner starts on init */
    this.spinnerService.show();

    setTimeout(() => {
        /** spinner ends after 1 seconds */
        this.spinnerService.hide();
    }, 1000);
  }

}
