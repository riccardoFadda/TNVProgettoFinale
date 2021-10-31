import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matchMovies',
  templateUrl: './matchMovies.component.html',
  styleUrls: ['./matchMovies.component.css']
})
export class MatchMoviesComponent implements OnInit {

  constructor() { }

  sh: any;
  isChecked: boolean = true;

  ngOnInit() {
  }

}
