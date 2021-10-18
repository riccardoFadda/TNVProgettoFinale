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
        //se è andato tutto bene, allora:
        console.log("ho ottenuto i dati!")
        this.moviesApi = response;
        console.log("i dati ottenuti sono: ", this.moviesApi);
        this.dataApi= this.moviesApi.data;
        console.log("results: ", this.dataApi);
        //console.log("I dati stringify: " + JSON.stringify(this.movies))
      },
      error => console.log(error)

      
    )
  }
    

}


