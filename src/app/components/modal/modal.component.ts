import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { DataApiService } from 'src/app/service/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: []
})

export class ModalComponent implements OnInit {

  @Input() userId: string;
  @ViewChild('btnClose') btnClose: ElementRef;

  constructor(public _dataApi: DataApiService) { }

  ngOnInit() {
  }

  public onSaveNew(formNew: NgForm) {
    console.log('Form', formNew.value);

    if (formNew.value.id === null) {
      formNew.value.userId = this.userId;
      this._dataApi.addNew(formNew.value);
    } else {
      this._dataApi.updateNew(formNew.value);
    }
    formNew.resetForm();
    this.btnClose.nativeElement.click();
  }

}
