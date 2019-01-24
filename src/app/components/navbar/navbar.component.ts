import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public statusLogin = false;

  constructor(private afAuth: AngularFireAuth, private _authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  public getCurrentUser() {
    this._authService.isAuth().subscribe( auth => {
      if (auth) {
        console.log('Usuario logeado');
        this.statusLogin = true;
      } else {
        console.log('Usuario no logeado');
        this.statusLogin = false;
      }
    });
  }

  public onLogout() {
    this._authService.logoutUser();
  }

}
