import { Component, OnInit } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})

export class ModalComponent implements OnInit {

  constructor(public _dataApi: DataApiService) { }

  ngOnInit() {
  }

  public onSaveNew(formNew: NgForm) {
    console.log('Form', formNew.value);
    this._dataApi.addNew(formNew.value);
    formNew.resetForm();
  }

}
