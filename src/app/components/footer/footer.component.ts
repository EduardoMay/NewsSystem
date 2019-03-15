/**
 * @fileoverview FooterComponent, footer de la pagina
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento el footer sin ningun metodo
 *
 * La primara version de FooterComponent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { CommentsPageApiService } from 'src/app/service/comments-page-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { CommentPagInterface } from 'src/app/models/commentPag';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  public statusAuth = false;
  public commentPage: string;
  public commentSend: CommentPagInterface = {
    idUser: ''
  };

  constructor(private _commentsPageServ: CommentsPageApiService,
    private _authService: AuthService) { }

  ngOnInit() {
    this.getCurrentUser();
  }

  /**
   * saber el estado del usuario si esta logeado o no
  */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( userData => {
      if (userData) {
        this.commentSend.idUser = userData.uid;
        this.commentSend.email = userData.email;
        this.statusAuth = true;
      } else {
        console.log('No logeado footer');
        this.statusAuth = false;
      }
    });
  }

  /**
   * guardar comentario
  */
  private addCommentPage (formCommentPage: NgForm) {
    if ( this.commentPage !== null) {
      this.commentSend.comment = this.commentPage;
      this.commentSend.date = new Date().getTime();

      this._commentsPageServ.addCommentPage(this.commentSend);

      formCommentPage.resetForm();
    }
  }

}
