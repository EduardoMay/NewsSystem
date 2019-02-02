/**
 * @fileoverview ProfileComponent, metodos para poder poder obtener los datos de la persona
 * logeado, tambien se declaran metodos para poder actualizar su foto de perfil
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento diferentes metodos para obtener datos y actualizar foto de perfil
 *
 * La primara version de ProfileComponent fue escrita por Eduardo May
*/

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public divUpdatePhoto = false; // true: poder mostrar la caja para poder subir la imagen
  public alertMessage = ''; // alerta de mensage
  public alertAct = false; // true: se muestra la alerta
  public user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  }; // datos de la persona logeada
  public providerId = 'null'; // id del perfil

  public username = '';
  public uploadPercent: Observable<number>; // pocentaje de la subida de la imagen
  public urlImage: Observable<string>; // url de la imagen donde se guarda en la base de datos
  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(private _authService: AuthService,
              private angStorage: AngularFireStorage) { }

  ngOnInit() {
    /**
     * Obtiene las propiedades del perfil
    */
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        this.user.name = userData.displayName;
        this.username = userData.displayName;
        this.user.email = userData.email;
        this.user.photoUrl = userData.photoURL;
        this.providerId = userData.providerData[0].providerId;
        // console.log('Datos del usuario: ', userData);
        // console.log('Datos del usuario: ', this.providerId);
      }
    });
  }

  /**
   * guardar el url de la imagen en los datos del perfil
  */
  public uploadImagenUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        userData.updateProfile({
          displayName: this.username,
          photoURL: this.inputImageUser.nativeElement.value
        }).then( () => {
          console.log('Usuario actualizado');
          // Alerta
          this.alertMessage = 'Has actualizado tus datos';
          this.alertAct = true;
          // Esconder el cuadro para subir foto
          this.divUpdatePhoto = false;
          setTimeout(() => {
            this.alertAct = false;
          }, 3000);
        }).catch( () => {
          console.log('Error al actualizar perfil');
        });
      }
    });
  }

  /**
   * guardar el url de la imagen en los datos del perfil
  */
  public uploadUsernameUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        userData.updateProfile({
          displayName: this.username,
          photoURL: this.user.photoUrl
        }).then( () => {
          console.log('Usuario actualizado');
          // Alerta
          this.alertMessage = 'Has actualizado tus datos';
          this.alertAct = true;
          // Actualizar foto de perfil
          this.user.name = userData.displayName;
          // Esconder el cuadro para subir foto
          this.divUpdatePhoto = false;
          setTimeout(() => {
            this.alertAct = false;
          }, 3000);
        }).catch( () => {
          console.log('Error al actualizar perfil');
        });
      }
    });
  }

  /**
   * guarda la imagen en firestore
  */
  public onUpload(e) {
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/profile_${id}`;
    const ref = this.angStorage.ref(filePath);
    const task = this.angStorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => {
      this.urlImage = ref.getDownloadURL();
    })).subscribe();
  }

  /**
   * muestra la parte donde se actualiza la foto
  */
  public btnUpdatePhoto() {
    this.divUpdatePhoto = true;
  }

}
