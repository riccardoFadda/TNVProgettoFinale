import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseURL = 'http://localhost:8080/users';


  constructor(private http: HttpClient) {  }

  getAllUsers(authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<any>(this.baseURL + "/", {headers});
  }

  getUserById(id: number, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<any>(this.baseURL + "/"+ id, {headers});
  }

  getUserByUsername(username: string, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<any>(this.baseURL + "/username/"+ username, {headers});
  }

  getUserByPartialUsername(partial: string, authentication: string){
    const headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'Basic ' + btoa(authentication)
    })
    return this.http.get<any[]>(this.baseURL + "/username/like/"+ partial, {headers});
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
