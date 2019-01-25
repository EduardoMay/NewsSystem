import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public user: UserInterface = {
    name: '',
    email: '',
    photoUrl: ''
  };
  public providerId = 'null';

  constructor(private _authService: AuthService) { }

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

}
