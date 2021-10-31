import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';
import { MovieData } from './../../models/data.model'
import { AuthService } from '../../services/auth.service';
import { UserInterface } from 'src/app/models/user.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  constructor(private dataService: DataService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(
      response => this.currentUser = response,
      error => console.log(error)
    )

  }

  dataEntry : MovieData;

  genres = ['Action','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family','Fantasy',
            'History','Horror','Music','Mystery','Romance','Science Fiction','TV Movie','Thriller','War','Western']
  ratedOptions = ['yes', 'no']

  currentUser: UserInterface;

  onSubmit(form : NgForm){
    this.dataEntry = form.form.value;
    console.log(form)
    console.log(this.dataEntry);

    if(form.form.value.rated==='yes'){
      this.dataEntry.rated=true;
    }else{
      this.dataEntry.rated=false;
    }

    this.dataEntry.addedBy = this.currentUser.id;

    this.dataService.addEntry(this.dataEntry).subscribe(response => {
      console.log(response);
      this.router.navigate(['/dashboard']);
    },
    (err) => {
      //fai qualcosa
    }
    )
  }
}
