import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {  }

  getAllUsers(authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<UserInterface[]>(this.baseURL + "/", {headers});
  }

  getUserById(id: number, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<UserInterface>(this.baseURL + "/"+ id, {headers});
  }

  getUserByUsername(username: string, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<UserInterface>(this.baseURL + "/username/"+ username, {headers});
  }

  getUserByPartialUsername(partial: string, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<UserInterface[]>(this.baseURL + "/username/like/"+ partial, {headers});
  }

  addUser = (data: UserInterface, authentication: string) => {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    console.log("Ho ricevuto", data);
    return this.http.post<UserInterface>(this.baseURL + "/", JSON.stringify({
      "email": data.email,
      "enabled": data.enabled,
      "username": data.username,
      "password": data.password
    }), {headers})
  }


  /*postMovieRating = (data: MovieRatingsDataInterface) => {
    console.log("Ho ricevuto", data);
    return this.http.post<MovieRatingsDataInterface>(this.baseURL, {
      "movie_id": data.movie_id,
      "user_id": data.user_id,
      "movie_rating": data.movie_rating
    });
  }



  deleteUserById(id: number, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.delete(this.baseURL + "/"+ id, {headers});
  }*/
}
