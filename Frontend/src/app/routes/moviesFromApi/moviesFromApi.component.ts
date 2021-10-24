import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieListInterface, MoviesApiResultsInterface } from '../../models/movieFromApi.model';
import { MoviesFromApiService } from '../../services/movieFromApi.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-MoviesFromApi',
  templateUrl: './MoviesFromApi.component.html',
  styleUrls: ['./MoviesFromApi.component.css']
})

export class MoviesFromApiComponent implements OnInit {


  moviesApi: MovieListInterface;
  randomElement1: MoviesApiResultsInterface;
  randomElement2: MoviesApiResultsInterface;
  

  constructor(private movieService: MoviesFromApiService) { }

  ngOnInit(): void {
    this.getMoviesApi();
  }

  getMoviesApi(){
    this.movieService.getMovies().subscribe(
      response => {
        
        this.moviesApi = response;
        this.randomElement1 = this.moviesApi.results[Math.floor(Math.random()*this.moviesApi.results.length)];
        this.randomElement2 = this.moviesApi.results[Math.floor(Math.random()*this.moviesApi.results.length)];
        console.log(this.randomElement1);
        console.log(this.randomElement2); 
        this.addToDb(this.randomElement1);
        this.addToDb(this.randomElement2);
      },

      error => console.log(error)
      
    )
  }

  addToDb(random: MoviesApiResultsInterface) {
    this.movieService.addEntry(random).subscribe(
      response => {
        console.log(response);
    throw new Error('Function not implemented.');
  })
  }
  
  /*
  moviesToDb(){
    this.movieService.addEntry().subscribe(
      response => {
        console.log(response);
  }
  */

  
  /*TO DO 
  matchMoviesFromApi(){
    fromApiFunctionality()
    gamingMatchMoviesFromApi()
  }
  
  fromApiFunctionality(){
    getMoviesFromApi()
    selectTwoRandomFilm()
    sendToDbSelectedMovies()
    sendToViewSelection()
  }
  
  gamingMatchMoviesFromApi(){
     selectionMovie()
     addOneCountDb()
     reloadOneRandomMovieFromApi()
  }
  
  */
}
    








