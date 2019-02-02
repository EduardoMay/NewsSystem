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
  public isAdmin: any = null;
  public userUid = null;
  public pageActual = 1;

  constructor(private _dataApi: DataApiService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
    this.getListNews();
  }

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
