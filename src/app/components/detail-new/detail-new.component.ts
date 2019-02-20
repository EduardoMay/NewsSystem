/**
 * @fileoverview DetailNewComponent, se implementa metodo para obtener el id de la noticia
 * y mostrar en el html toda la informacion de la notcia
 *
 * @version 1.0
 *
 * @author Eduardo May<eduardo_may@outlook.com>
 *
 * History
 * v1.0 Se implemento un metodo para obtener una noticia por medio del id de la noticia
 *
 * La primara version de DetailNewComponent fue escrita por Eduardo May
*/

import { Component, OnInit } from '@angular/core';
import { NewInterface } from 'src/app/models/new';
import { DataApiService } from 'src/app/service/data-api.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { UserInterface } from 'src/app/models/user';
import { CommentsInterface } from 'src/app/models/comments';
import { CommentsApiService } from 'src/app/service/comments-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-detail-new',
  templateUrl: './detail-new.component.html',
  styleUrls: ['./detail-new.component.css']
})
export class DetailNewComponent implements OnInit {

  public userAuth = false;
  public new: NewInterface = {}; // se guarda la noticia obtenida
  public urlimage = ''; // se guarda el url de la imagen
  public userData: UserInterface = {
    id: '',
    name: '',
    photoUrl: ''
  };
  public MessageComent = '';
  public commentUser: CommentsInterface = {};
  public commentsNew: CommentsInterface[] = [];

  constructor(private _dataApiService: DataApiService,
    private route: ActivatedRoute,
    private _authService: AuthService,
    private _commentService: CommentsApiService) {
      this.route.params.subscribe( params => {
        this.commentUser.idNew = params['id'];
      });
    }

  ngOnInit() {
    const idNew = this.route.snapshot.params['id']; // so obtiene el id de la ruta
    this.getDetails(idNew);

    this.getCurrentUser();

    this.getAllComents();
  }

  /**
   * se ontiene una noticia
   */
  public getDetails( idbook: string ): void {
    this._dataApiService.getOneNew( idbook ).subscribe( newDetail => {
      // console.log('noticia', newDetail);
      this.new = newDetail;
      this.urlimage = this.new.urlImage;
      // console.log(this.urlimage);
    });
  }

  /**
   * obtener los datos del usuario
  */
  public getCurrentUser() {
    this._authService.isAuth().subscribe( data => {
      if ( data ) {
        this.userAuth = true;
        this.userData.id = data.uid;
        this.userData.name = data.displayName;
        this.userData.photoUrl = data.photoURL;
      }
    });
  }

  /**
   * obtener todos los comentarios
  */
  public getAllComents() {
    this._commentService.getAllComments().subscribe( dataComments => {
      if (dataComments) {
        this.commentsNew = [];
        for (let i = 0; i < dataComments.length; i++) {
          if (dataComments[i].idNew === this.commentUser.idNew) {
            this.commentsNew.push(dataComments[i]);
          }
        }
        // console.log('comentarios: ', this.commentsNew);
      }
    });
  }

  /**
   * enviar comentarios
  */
  public sendComent(commentForm: NgForm) {
    this.commentUser.nameUser = this.userData.name;
    this.commentUser.photoUser = this.userData.photoUrl;
    this.commentUser.messageComent = commentForm.value.comentario;
    this.commentUser.fecha = new Date().getTime();
    // console.log('Comentario: ', this.commentUser);
    // console.log('form: ', commentForm);
    this._commentService.addComment(this.commentUser);
    commentForm.resetForm();
  }

}
