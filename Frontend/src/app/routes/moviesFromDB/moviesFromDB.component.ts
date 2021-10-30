import { Component, OnInit } from '@angular/core';
import { MoviesFromDbService }from'../../services/movieFromDb.service';
import { DataService } from '../../services/data.service';
import { MovieData } from '../../models/data.model';
import { AuthService } from 'src/app/services/auth.service';
import { GenresResultsInterface } from 'src/app/models/movieFromApi.model';
import { UserInterface } from 'src/app/models/user.model';
import { MoviesFromApiService } from 'src/app/services/movieFromApi.service';

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

  movieToDb1: MovieData = {
    "addedBy" : 0,
    "cast": "",
    "counter": 0,
    "director": "",
    "evaluation": 0,
    "genre": "",
    "name": "",
    "rated": false,
    "reviews": "",
    "apiId": 0
  };
  movieToDb2: MovieData = {
    "addedBy" : 0,
    "cast": "",
    "counter": 0,
    "director": "",
    "evaluation": 0,
    "genre": "",
    "name": "",
    "rated": false,
    "reviews": "",
    "apiId": 0
  };
  genres: GenresResultsInterface[];

  currentUser: UserInterface;

  constructor(private dbService: MoviesFromDbService, private dataService:DataService,private auth: AuthService, private movieService: MoviesFromApiService) { }

   ngOnInit(): void {
    this.auth.user.subscribe(
      response => {
        this.currentUser = response;
        this.movieService.getGenres().subscribe(
          response => {
            this.genres=response.genres;
            this.getMoviesDb();
          }
        )
      },
      error => console.log(error)
    )
    
  }

  getMoviesDb(){
    this.getRandomMovie(this.randomMovie1, this.movieToDb1.apiId);
    this.getRandomMovie(this.randomMovie2, this.movieToDb2.apiId);
  }
 

  getRandomMovie(randomMovie,movieToDb){
    this.dbService.getMovies().subscribe(
      response => {
        console.log(response);
        randomMovie.movieData = response[this.dbService.getRandomInt(0,30)];
        console.log(randomMovie.movieData);
    
      },                     
   )    
  }

  addMovieToDb(randomMovie, movieToDb){
    var alreadyInDb = false;
    this.dbService.getMovies().subscribe(
      response => {
        response.forEach(element => {
          if(element.apiId===randomMovie.movieData.id){
            alreadyInDb=true;
          }
        });
        if(alreadyInDb===false){
          this.dataService.addEntry(movieToDb).subscribe(
            response => console.log(response),
            error => console.log(error)
          )
        }
      },
      error => console.log(error)
    )
  }


  pickMovie(movie, movieToDb){
    this.addMovieToDb(this.randomMovie1, this.movieToDb1);
    this.addMovieToDb(this.randomMovie2, this.movieToDb2);
    var movieId;
    var newCounter;
    this.dataService.getData().subscribe(
      response => {
        response.forEach(element => {
          if(element.name===movieToDb.name && element.director===movieToDb.director) movieId=element.id;
        });
        this.dataService.getEntry(movieId).subscribe(
          response => {
            newCounter = response.counter;
            newCounter++;
            movieToDb.counter=newCounter;
            movieToDb.id=movieId;
            //console.log("modificato da mandare al db: ", movieToDb)
            this.dataService.editEntry(movieToDb).subscribe(
              response => {
                console.log(response);
                if(movie===this.randomMovie1) this.getRandomMovie(this.randomMovie2, this.movieToDb2);
                else this.getRandomMovie(this.randomMovie1, this.movieToDb1);
              },
              error => console.log(error)
            )
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }
}

