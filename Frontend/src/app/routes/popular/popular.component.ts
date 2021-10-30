import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieData } from 'src/app/models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  constructor( private dataService: DataService, private router : Router) { }

  ngOnInit(): void {
    this.getEntries()
  }

  public movies: MovieData [];
  public sortedMovies: MovieData [];
  moviesDataLoader=false;

  getEntries(){
    this.dataService.getData().subscribe( (response : any) => {
      this.movies = response;
      this.movies.sort((a, b) => {
        return b.counter - a.counter;
      });
      this.sortedMovies=this.movies;
      this.moviesDataLoader=true;

    })
  }

  goToDetails(id){
    this.router.navigateByUrl('/details/' + id);
  }


}
