import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInterface } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  newEntry : UserInterface
  alreadyExistingUser: boolean = false;
  alreadyExistingEmail: boolean = false;
  userList: UserInterface[]

  constructor(private users: UserService, private router: Router) { }

  ngOnInit(): void {
    this.users.getAllUsers().subscribe(
      response => this.userList=response,
      error => console.log(error)
    )
  }

  onSubmit(form : NgForm){
    this.alreadyExistingUser=false;
    this.alreadyExistingEmail=false;
    this.newEntry = form.form.value;
    console.log(form);
    console.log(this.newEntry);
    this.newEntry.enabled=1;
    this.check(this.newEntry);
    if(this.alreadyExistingEmail===false && this.alreadyExistingUser===false){
      this.users.addUser(this.newEntry).subscribe(response => {
        this.router.navigate(['/login']);
        console.log(response);
      },
      error => console.log(error)
      )
    }
  }

  check(newUser: UserInterface){
    this.userList.forEach(element => {
      if(element.username.toLowerCase()===newUser.username.toLowerCase()) this.alreadyExistingUser=true;
      if(element.email.toLowerCase()===newUser.email.toLowerCase()) this.alreadyExistingEmail=true;
    });
  }
}
