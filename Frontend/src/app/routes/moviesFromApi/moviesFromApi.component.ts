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

  movieToDb: MovieData = {
    "addedBy" : 0,
    "cast": "",
    "counter": 0,
    "director": "",
    "evaluation": 0,
    "genre": "",
    "name": "",
    "rated": false,
    "reviews": ""
  };


  constructor(private movieService: MoviesFromApiService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getMoviesApi();

  }

  getMoviesApi(){
    this.getRandomMovie(this.randomMovie1);
    this.getRandomMovie(this.randomMovie2);
  }

  getRandomMovie(randomMovie){
    this.movieService.getMovies().subscribe(
      response => {
        console.log(response)
        //da aggiungere controlli che il nuovo film preso dall'api non sia lo stesso di prima, o uguale all'altro già presente
        randomMovie.movieData = response.results[this.movieService.getRandomInt(0,19)];
        console.log(randomMovie.movieData);
        this.movieService.getMovieCast(randomMovie.movieData.id).subscribe(
          response => {
            randomMovie.movieCast = response.cast;
            randomMovie.movieCrew = response.crew;
            console.log("cast: ", randomMovie.movieCast)
            console.log("crew: ", randomMovie.movieCrew)
            this.addMovieToDb(randomMovie);
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }

  addMovieToDb(randomMovie){
    this.movieToDb.name = randomMovie.movieData.title;
    console.log(randomMovie.movieCast);
    this.movieToDb.cast = randomMovie.movieCast[0].name+", "+randomMovie.movieCast[1].name+", "+randomMovie.movieCast[2].name;
    this.movieToDb.rated = randomMovie.movieData.adult;
    this.movieToDb.evaluation = randomMovie.movieData.vote_average;
    this.movieToDb.releaseDate = randomMovie.movieData.release_date;
    randomMovie.movieCrew.forEach(element => {
      if(element.job==="Director") this.movieToDb.director=element.name;
    });
    var trimmedOverview = randomMovie.movieData.overview.length > 100 ?
                    randomMovie.movieData.overview.substring(0, 99) + "…" :
                    randomMovie.movieData.overview;
    this.movieToDb.reviews = trimmedOverview;
    this.movieToDb.genre = "Horror";    //da modificare per selezionare il vero genere
    //da aggiungere l' "addedBy", poi lo faccio io

    console.log("da mandare al db:", this.movieToDb);

    //da aggiungere controllo per vedere che il film non sia già nel database
    this.dataService.addEntry(this.movieToDb).subscribe(
      response => console.log(response),
      error => console.log(error)
    )
  }

}


