import { Component, OnInit } from '@angular/core';
import { NewInterface } from 'src/app/models/new';
import { DataApiService } from 'src/app/service/data-api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.css']
})
export class DetailNewComponent implements OnInit {

  public new: NewInterface = {};
  public urlimage = '';

  constructor(private _dataApiService: DataApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const idNew = this.route.snapshot.params['id'];
    this.getDetails(idNew);
  }

  public getDetails( idbook: string ): void {
    this._dataApiService.getOneNew( idbook ).subscribe( newDetail => {
      console.log('noticia', newDetail);
      this.new = newDetail;
      this.urlimage = this.new.urlImage;
      console.log(this.urlimage);
    });
  }

}
