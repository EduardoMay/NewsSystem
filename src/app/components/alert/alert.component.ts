/**
 * @fileoverview AlertComponent, se implemento para guardar datos sobre algun mensage
 * de error que se pueda dar
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento variable para guardar la alerta
 *
 * La primara version de AlertComponent fue escrita por Eduardo May
*/

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
