import { Component, OnInit } from '@angular/core';
import { NewInterface } from 'src/app/models/new';
import { DataApiService } from 'src/app/service/data-api.service';
import { AlertInterface } from 'src/app/models/alert';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news = [];
  public new = '';
  public alert: AlertInterface = {
    active: false
  };

  constructor(private _dataApi: DataApiService) { }

  ngOnInit() {
    $('.carousel').carousel({
      interval: 3000,
      wrap: true
    });

    this._dataApi.getAllNews().subscribe( news => {
      if (news.length > 0) {
        this.news = news;
        console.log('Noticias: ', news);
      } else {
        this.alert = {
          mensaje: 'Error en el servidor Firebase',
          descripcion: 'Error al obtener registros de la base de datos...',
          tipo: 'danger',
          status: 500,
          active: true
        };
        console.log(this.alert);
      }
    });
  }

}
