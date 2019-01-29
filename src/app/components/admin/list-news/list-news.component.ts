import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { NewInterface } from 'src/app/models/new';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  public news: NewInterface[] = [];
  // public isAdmin: any = null;
  // public userUid: string = null;

  constructor(private _dataApi: DataApiService) { }

  ngOnInit() {
    this._dataApi.getAllNews().subscribe( news => {
      this.news = news;
    });
  }

}
