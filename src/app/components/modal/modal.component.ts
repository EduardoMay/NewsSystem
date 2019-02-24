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
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})

export class ModalComponent implements OnInit {

  @Input() userUid: string; // se obtiene el id del usuario
  @ViewChild('btnClose') btnClose: ElementRef;
  public nameUser = '';

  public imgNew = {};
  public uploadPercent: Observable<number>; // pocentaje de la subida de la imagen
  public urlImageNew: Observable<string>; // url de la imagen donde se guarda en la base de datos
  public statusUpdateNew = false;
  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(public _dataApi: DataApiService,
    private _authService: AuthService,
    private angStorage: AngularFireStorage) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  /**
   * obtener el nombre de usuario
  */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( data => {
      if (data) {
        this.nameUser = data.displayName;
      }
    });
  }

  /**
   * guarda y actualizar la noticia
  */
  public onSaveNew(formNew: NgForm) {
    // console.log('Form', formNew.value);
    if (formNew.value.id === null) {
      formNew.value.urlImage = this.inputImageUser.nativeElement.value;
      formNew.value.userUid = this.userUid;
      formNew.value.fecha = new Date().getTime();
      this._dataApi.addNew(formNew.value); // guarda
    } else {
      this._dataApi.updateNew(formNew.value); // actualiza
    }

    formNew.resetForm(); // limpia el formulario
    this.btnClose.nativeElement.click(); // cierra el modal
  }

  public onPreUpdateImg (e) {
    this.imgNew = e;
  }

  public saveImgNew (img) {
    const id = Math.random().toString(10).substring(2);
    const file = img.target.files[0];
    const filePath = `imgNews/new_${id}`;
    const ref = this.angStorage.ref(filePath);
    const task = this.angStorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => {
      this.urlImageNew = ref.getDownloadURL();
      this.statusUpdateNew = true;
    })).subscribe();
  }

  public btnSaveImg () {
    this.saveImgNew(this.imgNew);
  }

  public resetForm(formNew) {
    formNew.resetForm();
  }

}
