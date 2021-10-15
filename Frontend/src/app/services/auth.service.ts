import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UserInterface } from '../models/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject: BehaviorSubject<UserInterface>;
  public user: Observable<UserInterface>;

  constructor(private http: HttpClient, private router: Router, private users: UserService) {
    this.userSubject = new BehaviorSubject<UserInterface>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): UserInterface {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.users.getUserByUsername(username).subscribe(
      response => {
        let user: UserInterface = response;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.userSubject.next(user);
        console.log("l'utente è", localStorage.getItem('currentUser'));
        return user;
      },
      error => console.log(error)
    )
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.userSubject.next(null);
    console.log("l'utente è", localStorage.getItem('currentUser'));
  }

}
