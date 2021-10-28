import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from 'src/app/models/apiMovie.model';
import { MovieListInterface, MoviesApiResultsInterface, MoviesApiCastAndCrewInterface, MoviesApiCastResultsInterface, MoviesApiCrewResultsInterface } from '../../models/movieFromApi.model';
import { MoviesFromApiService } from '../../services/movieFromApi.service';
import { MovieData } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-MoviesFromApi',
  templateUrl: './MoviesFromApi.component.html',
  styleUrls: ['./MoviesFromApi.component.css']
})

export class MoviesFromApiComponent implements OnInit {


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

  moviesApi: MovieListInterface;
  dataApi: MoviesApiResultsInterface[];

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


  constructor(private movieService: MoviesFromApiService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getMoviesApi();
  }

  getMoviesApi(){
    this.getRandomMovie(this.randomMovie1, this.movieToDb1);
    this.getRandomMovie(this.randomMovie2, this.movieToDb2);
  }

  getRandomMovie(randomMovie, movieToDb){
    this.movieService.getMovies().subscribe(
      response => {
        let alreadyPresent = true;
        let previousId1=this.randomMovie1.movieData.id;
        let previousId2=this.randomMovie2.movieData.id;
        let i=0;
        console.log(response)
        do{
          //randomMovie.movieData = response.results[this.movieService.getRandomInt(0,19)];
          randomMovie.movieData = response.results[i++];
          console.log("confronto il nuovo ", randomMovie.movieData.id, " con ", previousId1, " e ",previousId2)
          if(randomMovie.movieData.id===previousId1 || randomMovie.movieData.id===previousId2) alreadyPresent=true;
          else alreadyPresent=false;
          console.log("il risultato è ", alreadyPresent)
        } while(alreadyPresent===true)
        console.log(randomMovie.movieData);
        this.movieService.getMovieCast(randomMovie.movieData.id).subscribe(
          response => {
            randomMovie.movieCast = response.cast;
            randomMovie.movieCrew = response.crew;
            console.log("cast: ", randomMovie.movieCast)
            console.log("crew: ", randomMovie.movieCrew)
            this.addMovieToDb(randomMovie, movieToDb);
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

  addMovieToDb(randomMovie, movieToDb){
    var alreadyInDb = false;
    this.prepareMovieToDb(randomMovie, movieToDb);
    this.dataService.getData().subscribe(
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

  prepareMovieToDb(movie, movieToDb){
    movieToDb.name = movie.movieData.title;
    console.log(movie.movieCast);
    if(movie.movieCast.length>0) movieToDb.cast = movie.movieCast[0].name;
    if(movie.movieCast.length>1) movieToDb.cast= movieToDb.cast+", "+movie.movieCast[1].name;
    if(movie.movieCast.length>2) movieToDb.cast= movieToDb.cast+", "+movie.movieCast[2].name;
    movieToDb.rated = movie.movieData.adult;
    movieToDb.evaluation = movie.movieData.vote_average;
    movieToDb.releaseDate = movie.movieData.release_date;
    movieToDb.apiId = movie.movieData.id;
    movie.movieCrew.forEach(element => {
      if(element.job==="Director") movieToDb.director=element.name;
    });
    var trimmedOverview = movie.movieData.overview.length > 100 ?
                    movie.movieData.overview.substring(0, 99) + "…" :
                    movie.movieData.overview;
    movieToDb.reviews = trimmedOverview;
    movieToDb.genre = "Horror";    //da modificare per selezionare il vero genere
    //da aggiungere l' "addedBy", poi lo faccio io

    console.log("da mandare al db:", movieToDb);
  }

  pickMovie(movie, movieToDb){
    this.addMovieToDb(this.randomMovie1, this.movieToDb1);
    this.addMovieToDb(this.randomMovie2, this.movieToDb2);
    var movieId;
    var newCounter;
    this.prepareMovieToDb(movie, movieToDb);
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
            console.log("modificato da mandare al db: ", movieToDb)
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

  /*pickMovie1(){
    var movieId;
    var newCounter;
    this.prepareMovieToDb(this.randomMovie1);
    this.dataService.getData().subscribe(
      response => {
        response.forEach(element => {
          if(element.name===this.movieToDb.name && element.director===this.movieToDb.director) movieId=element.id;
        });
        this.dataService.getEntry(movieId).subscribe(
          response => {
            newCounter = response.counter++;
            this.movieToDb.counter=newCounter;
            this.movieToDb.id=movieId;
            this.dataService.editEntry(this.movieToDb).subscribe(
              response => {
                console.log(response);
                this.getRandomMovie(this.randomMovie2);
              },
              error => console.log(error)
            )
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }*/

}


