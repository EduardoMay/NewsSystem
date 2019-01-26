import { Component, OnInit } from '@angular/core';
import { NewInterface } from 'src/app/models/new';
import { DataApiService } from 'src/app/service/data-api.service';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public news: NewInterface[] = [];
  public new = '';

  constructor(private _dataApi: DataApiService) { }

  ngOnInit() {
    $('.carousel').carousel({
      interval: 3000,
      wrap: true
    });
    this._dataApi.getAllNews().subscribe( news => {
      console.log('Noticias: ', news);
      this.news = news;
    });
  }

}
