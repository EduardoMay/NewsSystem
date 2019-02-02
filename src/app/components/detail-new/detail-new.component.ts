/**
 * @fileoverview DetailNewComponent, se implementa metodo para obtener el id de la noticia
 * y mostrar en el html toda la informacion de la notcia
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento un metodo para obtener una noticia por medio del id de la noticia
 *
 * La primara version de DetailNewComponent fue escrita por Eduardo May
*/

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

  public new: NewInterface = {}; // se guarda la noticia obtenida
  public urlimage = ''; // se guarda el url de la imagen

  constructor(private _dataApiService: DataApiService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    const idNew = this.route.snapshot.params['id']; // so obtiene el id de la ruta
    this.getDetails(idNew);
  }

  /**
   * se ontiene una noticia
   */
  public getDetails( idbook: string ): void {
    this._dataApiService.getOneNew( idbook ).subscribe( newDetail => {
      // console.log('noticia', newDetail);
      this.new = newDetail;
      this.urlimage = this.new.urlImage;
      // console.log(this.urlimage);
    });
  }

}
