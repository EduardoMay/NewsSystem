import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { NewsComponent } from '../components/news/news.component';
import { Page404Component } from '../components/page404/page404.component';
import { LoginComponent } from '../components/user/login/login.component';

const ROUTES: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'noticias', component: NewsComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  imports: [[RouterModule.forRoot(ROUTES)]],
  exports: [RouterModule]
})
export class AppRoutingModule { }
