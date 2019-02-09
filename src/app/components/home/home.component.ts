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
import { LikeInterface } from 'src/app/models/like';
import { AuthService } from 'src/app/service/auth.service';
import { LikeService } from 'src/app/service/like.service';

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
  public userId = '';
  public activeUser = false;

  constructor(private _dataApi: DataApiService,
    private spinnerService: NgxSpinnerService,
    private _likeService: LikeService,
    private authService: AuthService) { }

  ngOnInit() {
    this.spinner(); // inicia el spinner

    $('.carousel').carousel({
      interval: 3000,
      wrap: true
    }); // uso del corousel de bootstrap 4.2

    this.getAllNews();

    this.getCurrentUser();
  }

  /**
   * usuario actual
  */
  public getCurrentUser() {
    this.authService.isAuth().subscribe( data => {
      if (data) {
        this.activeUser = true;
        this.userId = data.uid;
      }
    });
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

  /**
   * like new
  */
  public likeNew(liketipe, newId) {
    if (liketipe === 'like') {
      const likeNew: LikeInterface = {
        userId: this.userId,
        newId: newId,
        like: true
      };
      // console.log(likeNew);
      this._likeService.addLike(likeNew);
    } else if (liketipe === 'dislike') {
      console.log('dislike');
    }
  }

}
