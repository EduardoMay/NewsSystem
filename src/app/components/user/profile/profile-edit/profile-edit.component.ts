/**
 * @fileoverview  ProfileEditComponent, se implemento este componente para poder editar los datos del
 * usuario
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento metodos para poder editar la informacion del usuario
 *
 * La primara version de  ProfileEditComponent fue escrita por Eduardo May
*/

import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  private userUid = '';
  public username = '';
  public user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  }; // datos de la persona logeada

  public uploadPercent: Observable<number>; // pocentaje de la subida de la imagen
  public urlImage: Observable<string>; // url de la imagen donde se guarda en la base de datos
  @ViewChild('imageUser') inputImageUser: ElementRef;

  private idPhoto: string;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
    private angStorage: AngularFireStorage) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.userUid = params['id'];
    });

    this.getCurrentUser();
  }

  /**
   * ir atras
  */
  public goBack() {
    this.router.navigate(['/user/perfil']);
  }

  /**
   * usuario actual
  */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        this.user.name = userData.displayName;
        this.username = userData.displayName;
        this.user.email = userData.email;
        this.user.photoUrl = userData.photoURL;
      }
    });
  }

  /**
   * actualizar el nombre de perfil
  */
  public uploadUsernameUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        userData.updateProfile({
          displayName: this.username,
          photoURL: this.user.photoUrl
        }).then( () => {
          // Actualizar foto de perfil
          this.user.name = userData.displayName;
          this._authService.updateUserName(this.userUid, this.user.name);
          this.router.navigate(['/user/perfil']);
        }).catch( () => {
          console.log('Error al actualizar perfil');
        });
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
          this._authService.updateProfileUrl(userData.uid, userData.photoURL, this.idPhoto);
          console.log('Usuario actualizado');
          this.router.navigate(['/user/perfil']);
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
    this.idPhoto = `profile_${id}`;
    const filePath = `uploads/${this.idPhoto}`;
    const ref = this.angStorage.ref(filePath);
    const task = this.angStorage.upload(filePath, file);

    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe( finalize( () => {
      this.urlImage = ref.getDownloadURL();
    })).subscribe();
  }

}
