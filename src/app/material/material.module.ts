import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule
  ],
  exports: [
    MatButtonModule,
    MatToolbarModule,
    MatTableModule,
    MatFormFieldModule
  ]
})
export class MaterialModule { }
