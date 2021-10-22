import { Component, OnInit } from '@angular/core';
import { MoviesApiService } from '../../services/moviesapi.service';
import { MovieApiInterface, ResultInterface } from '../../models/apiMovie.model';

@Component({
  selector: 'app-movies-api',
  templateUrl: './movies-api.component.html',
  styleUrls: ['./movies-api.component.css']
})
export class MoviesApiComponent implements OnInit {

  movies : MovieApiInterface;
  results : ResultInterface[];

  constructor(private apiService:MoviesApiService) { }

  ngOnInit(): void {
    this.getMoviesListOnComponent();
  }

  getMoviesListOnComponent(){
    this.apiService.getMoviesList().subscribe(
      response => {
        this.movies = response;
        this.results= this.movies.results;
      },
      error => console.log(error)
    )
  }

}
