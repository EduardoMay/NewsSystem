/**
 * @fileoverview ModalComponent, se implementa metodo para guardar y actualizar noticia
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento metodo para guardar y actualizar noticia
 *
 * La primara version de ModalComponent fue escrita por Eduardo May
*/

import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})

export class ModalComponent implements OnInit {

  @Input() userUid: string; // se obtiene el id del usuario
  @ViewChild('btnClose') btnClose: ElementRef;

  constructor(public _dataApi: DataApiService) { }

  ngOnInit() {
  }

  /**
   * guarda y actualizar la noticia
  */
  public onSaveNew(formNew: NgForm) {
    // console.log('Form', formNew.value);

    if (formNew.value.id === null) {
      formNew.value.userUid = this.userUid;
      this._dataApi.addNew(formNew.value); // guarda
    } else {
      this._dataApi.updateNew(formNew.value); // actualiza
    }

    formNew.resetForm(); // limpia el formulario
    this.btnClose.nativeElement.click(); // cierra el modal
  }

}
