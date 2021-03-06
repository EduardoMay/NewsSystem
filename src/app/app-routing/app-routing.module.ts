/**
 * @fileoverview Routes, uso de las rutas amigables
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento el uso de las rutas amigables
 *
 * La primara version de Routes fue escrita por Eduardo May
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NewsComponent } from '../components/news/news.component';
import { Page404Component } from '../components/page404/page404.component';
import { LoginComponent } from '../components/user/login/login.component';
import { RegisterComponent } from '../components/user/register/register.component';
import { ProfileComponent } from '../components/user/profile/profile.component';
import { ListNewsComponent } from '../components/admin/list-news/list-news.component';
import { DetailNewComponent } from '../components/detail-new/detail-new.component';
import { AuthGuard } from '../guard/auth.guard';
import { UsersComponent } from '../components/admin/users/users.component';
import { MyPublicationsComponent } from '../components/my-publications/my-publications.component';
import { NoticeOfPrivacyComponent } from '../components/notice-of-privacy/notice-of-privacy.component';
import { ContactComponent } from '../components/contact/contact.component';
import { ProfileEditComponent } from '../components/user/profile/profile-edit/profile-edit.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'noticias', component: NewsComponent },
  { path: 'admin/listado', component: ListNewsComponent, canActivate: [AuthGuard] },
  { path: 'misPublicaciones', component: MyPublicationsComponent, canActivate: [AuthGuard] },
  { path: 'new/:id', component: DetailNewComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/registro', component: RegisterComponent },
  { path: 'user/perfil', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user/perfil/edit/:id', component: ProfileEditComponent, canActivate: [AuthGuard] },
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'aviso-privacidad', component: NoticeOfPrivacyComponent},
  { path: 'contacto', component: ContactComponent},
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [[RouterModule.forRoot(ROUTES, { useHash: true })]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
