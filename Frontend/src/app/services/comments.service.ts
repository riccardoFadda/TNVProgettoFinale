import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {CommentsInterface} from '../models/comments.model';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private baseURL = 'http://localhost:5000/comments';

  constructor(private http : HttpClient) { }

  getAllComments(){
    return this.http.get<CommentsInterface[]>(this.baseURL);
  }

  getCommentByCommentId(id: number){
    return this.http.get<CommentsInterface>(this.baseURL + "/"+ id);
  }


  postComment = (data: CommentsInterface) => {
    console.log("Ho ricevuto", data);
    return this.http.post<CommentsInterface>(this.baseURL, {
      "movieId": data.movieId,
      "userId": data.userId,
      "body": data.body
    });
  }

  putComment = (id: number, data: CommentsInterface) => {
    console.log("Ho ricevuto una put", data);
    return this.http.put<CommentsInterface>(this.baseURL+"/"+id, {
      "movieid": data.movieId,
      "userid": data.userId,
      "body": data.body
    });
  }

  deleteComment(id: number ){
    return this.http.delete(this.baseURL + "/"+id);
  }
}