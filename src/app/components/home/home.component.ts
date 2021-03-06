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
 * v2.0 Se implento el like
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
import { NgsRevealConfig } from 'ng-scrollreveal';
import { UserInterface } from 'src/app/models/user';

declare var $: any; // para usar el jquery

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news: NewInterface[] = []; // se guardan todas las noticas obtenidas
  public new = '';
  public alert: AlertInterface = {
    active: false
  }; // si existe algun mensage de error
  public user: UserInterface = {};
  public userId = '';
  public activeUser = false;
  public likes: LikeInterface[] = [];

  private currentDate;
  public welcomeMessage: string;

  public alertFailLogin = false;

  constructor(private _dataApi: DataApiService,
    private spinnerService: NgxSpinnerService,
    private _likeService: LikeService,
    private authService: AuthService,
    public config: NgsRevealConfig) { }

  ngOnInit() {
    this.spinner(); // inicia el spinner

    $('.carousel').carousel({
      interval: 3000,
      wrap: true
    }); // uso del corousel de bootstrap 4.2

    this.config.duration = 300;

    /**
     * Debe estar acomodado de la siguiente forma para poder obtener bien los datos
    */
    this.getCurrentUser(); // obtitne la informacion del usuario

    this.getAllLikes(); // obtiene todos los likes del usuario registrado

    this.getAllNews(); // obtiene todas las noticias añadiendo el like del usuario

    this.getCurrentDate(); // obtiene la hora actual
  }

  /**
   * saber la hora actual
  */
  public getCurrentDate() {
    this.currentDate = new Date().getHours();

    if ( this.currentDate >= 0 && this.currentDate < 12) {
      this.welcomeMessage = 'Buenos Dias';
    } else if ( this.currentDate >= 12 && this.currentDate <= 18) {
      this.welcomeMessage = 'Buenas Tardes';
    } else if ( this.currentDate > 18 && this.currentDate < 24) {
      this.welcomeMessage = 'Buenas Noches';
    }

    console.log(this.currentDate);
  }

  /**
   * usuario actual
  */
  public getCurrentUser() {
    this.authService.isAuth().subscribe( data => {
      if (data) {
        this.activeUser = true;
        this.userId = data.uid;
        this.user.name = data.displayName;

        this.authService.getCurrentUser( this.userId ).subscribe( dataUser => {

          if (dataUser ) {
            this.user.photoUrl = dataUser.photoUrl;
            this.alertFailLogin = false;
          } else {
            this.alertFailLogin = true;
          }

        });
      } else {
        this.activeUser = false;
      }

    });

  }

  /**
   * obtiene todas las noticias
  */
  public getAllNews() {
    this._dataApi.getAllNews().subscribe( news => {
      this.spinnerService.hide();
      if (news.length > 0) {
        this.checkLikeAndDislike(news);
        this.alert.active = false;
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
  }

  /**
   * like new
  */
  public likeNew(liketipe, Id) {
    if (liketipe === 'like') {
      const likeNew: LikeInterface = {
        userId: this.userId,
        newId: Id,
        like: true
      };
      this._likeService.addLike(likeNew);
      this.getAllNews();
    } else if (liketipe === 'dislike') {
      // console.log(newId);
      this._likeService.deleteLike(Id);
      this.getAllNews();
    }
  }

  /**
   * obtener todos los likes
  */
  public getAllLikes() {
    this._likeService.getAllLikes().subscribe( data => {
      this.likes = data;
    });
  }

  /**
   * checar si el usuario dio like o no
  */
  public checkLikeAndDislike(news) {
    let cont = 0;
    if (news.length > 0) {
      this.news = news;
      for (const data of news) {
        for (const like of this.likes) {
          if (data.id === like.newId && like.userId === this.userId) {
            data.like = like.like;
            data.idLike = like.id;
          }
          if (data.id === like.newId) {
            cont++;
            data.contador = cont;
          }
        }
        cont = 0;
      }
    }

    // console.log('Noticias: ', this.news);
  }
}
