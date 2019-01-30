import { Component, OnInit, Input } from '@angular/core';
import { AlertInterface } from 'src/app/models/alert';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit {

  @Input() alert: AlertInterface = {
    mensaje: '',
    descripcion: '',
    tipo: '',
    status: null,
  };

  constructor() { }

  ngOnInit() {
  }

}
