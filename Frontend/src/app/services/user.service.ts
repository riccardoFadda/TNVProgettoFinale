import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInterface } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseURL = 'http://localhost:8080/users';
  private authentication = 'admin:admin'

  constructor(private http: HttpClient) {  }

  getAllUsers(){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.authentication)
    })
    return this.http.get<UserInterface[]>(this.baseURL + "/", {headers});
  }

  getUserById(id: number){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.authentication)
    })
    return this.http.get<UserInterface>(this.baseURL + "/"+ id, {headers});
  }

  getUserByUsername(username: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.authentication)
    })
    return this.http.get<UserInterface>(this.baseURL + "/username/"+ username, {headers});
  }

  getUserByPartialUsername(partial: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.authentication)
    })
    return this.http.get<UserInterface[]>(this.baseURL + "/username/like/"+ partial, {headers});
  }

  addUser = (data: UserInterface) => {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(this.authentication)
    })
    console.log("Ho ricevuto", data);
    return this.http.post<UserInterface>(this.baseURL + "/", JSON.stringify({
      "email": data.email,
      "enabled": data.enabled,
      "username": data.username,
      "password": data.password
    }), {headers})
  }

  /*
  deleteUserById(id: number, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.delete(this.baseURL + "/"+ id, {headers});
  }*/
}
