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

  constructor(private users: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    this.newEntry = form.form.value;
    console.log(form);
    console.log(this.newEntry);
    this.newEntry.enabled=1;
    this.users.addUser(this.newEntry).subscribe(response => {
      this.router.navigate(['/login']);
      console.log(response);
    },
    error => console.log(error)
    )
  }
}
