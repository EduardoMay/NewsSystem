import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { LoginComponent } from './components/user/login/login.component';
import { DetailNewComponent } from './components/detail-new/detail-new.component';
import { HomeComponent } from './components/home/home.component';
import { Page404Component } from './components/page404/page404.component';
import { ListNewsComponent } from './components/admin/list-news/list-news.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NewsComponent } from './components/news/news.component';
import { FooterComponent } from './components/footer/footer.component';
import { ModalComponent } from './components/modal/modal.component';
import { AlertComponent } from './components/alert/alert.component';
import { UsersComponent } from './components/admin/users/users.component';
import { MyPublicationsComponent } from './components/my-publications/my-publications.component';
import { NoticeOfPrivacyComponent } from './components/notice-of-privacy/notice-of-privacy.component';
import { ContactComponent } from './components/contact/contact.component';
import { ProfileEditComponent } from './components/user/profile/profile-edit/profile-edit.component';

// firebase
// import { environment } from '../environments/environment';
import { firebase } from '../environments/firebase';
export const firebaseConfig = firebase.firebaseConfig;
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore, FirestoreSettingsToken } from '@angular/fire/firestore';

// scrollreveal
import { NgsRevealModule } from 'ng-scrollreveal';

// spinner
import { NgxSpinnerModule } from 'ngx-spinner';

// ngx-pagination
import { NgxPaginationModule } from 'ngx-pagination';
import { CommentsPublicComponent } from './components/user/comments-public/comments-public.component';

// Animations
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProfileComponent,
    RegisterComponent,
    LoginComponent,
    DetailNewComponent,
    HomeComponent,
    Page404Component,
    ListNewsComponent,
    NewsComponent,
    FooterComponent,
    AlertComponent,
    ModalComponent,
    UsersComponent,
    MyPublicationsComponent,
    NoticeOfPrivacyComponent,
    ContactComponent,
    ProfileEditComponent,
    CommentsPublicComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    NgsRevealModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    AngularFireAuth,
    AngularFirestore,
    { provide: FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
