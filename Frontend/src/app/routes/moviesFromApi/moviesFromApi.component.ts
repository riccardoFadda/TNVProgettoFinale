import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieListInterface, MoviesApiResultsInterface } from '../../models/movieFromApi.model';
import { MoviesFromApiService } from '../../services/movieFromApi.service';

@Component({
  selector: 'app-MoviesFromApi',
  templateUrl: './MoviesFromApi.component.html',
  styleUrls: ['./MoviesFromApi.component.css']
})

export class MoviesFromApiComponent implements OnInit {


  moviesApi: MovieListInterface;
  dataApi: MoviesApiResultsInterface[];
  

  constructor(private movieService: MoviesFromApiService) { }

  ngOnInit(): void {
    this.getMoviesApi();
  }

  getMoviesApi(){
    this.movieService.getMovies().subscribe(
      response => {
        
        this.moviesApi = response;
        this.dataApi= this.moviesApi.results;
      },
      error => console.log(error)

      
    )
  }
    
    

}


