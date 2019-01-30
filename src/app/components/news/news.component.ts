import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { AlertInterface } from 'src/app/models/alert';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  public news = [];
  public alert: AlertInterface;

  constructor(private _dataApi: DataApiService) { }

  ngOnInit() {
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
