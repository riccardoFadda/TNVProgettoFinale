import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { UserInterface } from 'src/app/models/user.model';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private user: UserService, private auth: AuthService) { }

  //variabili per l'input
  usernameInput: string;
  passwordInput: string;
  selectedUser: UserInterface;

  ngOnInit(): void {
  }

  submitButton(){
    if(this.usernameInput != null && this.passwordInput !=null){
      this.user.getUserByUsername(this.usernameInput).subscribe(
        response => {
          this.selectedUser = response;
          console.log("confronto ", this.passwordInput, " e ", this.selectedUser.password);
          if(this.passwordInput===this.selectedUser.password){
            this.auth.login(this.usernameInput, this.passwordInput);
          }
        },
        error => console.log(error)
      );
    }
  }
/*
  searchInsideArray(username: string, password: string): boolean{
    for(let i=0;i<this.users.length;i++){
      if(username==this.users[i].username && password == this.users[i].password){
        return true;
      }
    }
    return false;
  }*/

}
