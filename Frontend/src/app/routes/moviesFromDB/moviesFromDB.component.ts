import { Component, OnInit } from '@angular/core';
import { MoviesFromDbService }from'../../services/movieFromDb.service';

@Component({
  selector: 'app-moviesFromDB',
  templateUrl: './moviesFromDB.component.html',
  styleUrls: ['./moviesFromDB.component.css']
})
export class MoviesFromDBComponent implements OnInit {

  randomMovie1: {
    movieData: any,
    movieCast: any[],
    movieCrew: any[]
  } = {
    "movieData": 0,
    "movieCast": [],
    "movieCrew": []
  }

  randomMovie2: {
    movieData: any,
    movieCast: any[],
    movieCrew: any[]
  } = {
    "movieData": 0,
    "movieCast": [],
    "movieCrew": []
  }

  constructor(private dbService: MoviesFromDbService) { }

   ngOnInit(): void {
    this.getMoviesDb();

  }

  getMoviesDb(){
    this.getRandomMovie(this.randomMovie1);
    this.getRandomMovie(this.randomMovie2);
  }
 

  getRandomMovie(randomMovie){
    this.dbService.getMovies().subscribe(
      response => {
        console.log(response);
        randomMovie.movieData = response[this.dbService.getRandomInt(0,19)];
        console.log(randomMovie.movieData);
    
          },         
        
        )    
  }
  
}