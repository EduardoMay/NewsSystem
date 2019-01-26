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

  public divUpdatePhoto = false;
  public alertMessage = '';
  public alertAct = false;
  public user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  };
  public providerId = 'null';

  public uploadPercent: Observable<number>;
  public urlImage: Observable<string>;
  @ViewChild('imageUser') inputImageUser: ElementRef;

  constructor(private _authService: AuthService,
              private angStorage: AngularFireStorage) { }

  ngOnInit() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        this.user.name = userData.displayName;
        this.user.email = userData.email;
        this.user.photoUrl = userData.photoURL;
        this.providerId = userData.providerData[0].providerId;
        console.log('Datos del usuario: ', this.providerId);
      }
    });
  }

  public uploadImagenUser() {
    this._authService.isAuth().subscribe( userData => {
      if ( userData ) {
        userData.updateProfile({
          displayName: '',
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

  public btnUpdatePhoto() {
    this.divUpdatePhoto = true;
  }

}
