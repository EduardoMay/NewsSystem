import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { NewInterface } from 'src/app/models/new';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-list-news',
  templateUrl: './list-news.component.html',
  styleUrls: ['./list-news.component.css']
})
export class ListNewsComponent implements OnInit {

  public news: NewInterface[] = [];
  // public isAdmin: any = null;
  public userUid: string = null;

  constructor(private _dataApi: DataApiService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getListNews();
    this.getCurrentUser();
  }

  public getCurrentUser() {
    this._authService.isAuth().subscribe( auth => {
      if (auth) {
        this.userUid = auth.uid;
      }
    });
  }

  /**
   * Obtener todas las noticias
  */
  public getListNews() {
    this._dataApi.getAllNews().subscribe( news => {
      this.news = news;
    });
  }

  public onPreUpdateNew( newData: NewInterface) {
    this._dataApi.selectedNew = Object.assign({}, newData);
  }

  public onDeleteNew( idNew: string ): void {
    const confirmation = confirm('Deseas eliminarlo?');
    if (confirmation) {
      this._dataApi.deleteNew( idNew );
    }
  }

}
