import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NewsComponent } from '../components/news/news.component';
import { Page404Component } from '../components/page404/page404.component';
import { LoginComponent } from '../components/user/login/login.component';
import { RegisterComponent } from '../components/user/register/register.component';
import { ProfileComponent } from '../components/user/profile/profile.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'noticias', component: NewsComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/registro', component: RegisterComponent },
  { path: 'user/perfil', component: ProfileComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [[RouterModule.forRoot(ROUTES)]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
