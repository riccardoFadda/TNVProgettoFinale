import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from 'src/app/models/apiMovie.model';
import { MovieListInterface, MoviesApiResultsInterface, MoviesApiCastAndCrewInterface, MoviesApiCastResultsInterface, MoviesApiCrewResultsInterface } from '../../models/movieFromApi.model';
import { MoviesFromApiService } from '../../services/movieFromApi.service';
import { MovieData } from '../../models/data.model';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-MoviesFromApi',
  templateUrl: './MoviesFromApi.component.html',
  styleUrls: ['./MoviesFromApi.component.css']
})

export class MoviesFromApiComponent implements OnInit {


  moviesApi: MovieListInterface;
  dataApi: MoviesApiResultsInterface[];
  movie1: MoviesApiResultsInterface;
  movie2: MoviesApiResultsInterface;
  movie1CastAndCrew: MoviesApiCastAndCrewInterface;
  movie1CastResults: MoviesApiCastResultsInterface[];
  movie1CrewResults: MoviesApiCrewResultsInterface[];
  movie2CastAndCrew: MoviesApiCastAndCrewInterface;
  movie2CastResults: MoviesApiCastResultsInterface[];
  movie2CrewResults: MoviesApiCrewResultsInterface[];
  movieToDb: MovieData = {
    "id" : 0,
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
  movie1Director: string;
  movie2Director: string;


  constructor(private movieService: MoviesFromApiService, private dataService: DataService) { }

  ngOnInit(): void {
    this.getMoviesApi();
  }

  getMoviesApi(){
    this.movieService.getMovies().subscribe(
      response => {
        this.moviesApi = response;
        this.dataApi= this.moviesApi.results;
        this.movie1 = this.dataApi[0];
        this.movie2 = this.dataApi[1];
        console.log(this.movie1, this.movie2);
        this.getMovieCastAndCrew();

      },
      error => console.log(error)
    )
  }

  getMovieCastAndCrew(){
    this.movieService.getMovieCast(this.movie1.id).subscribe(
      response => {
        this.movie1CastAndCrew = response;
        console.log(this.movie1CastAndCrew)
        this.movie1CastResults = this.movie1CastAndCrew.cast;
        console.log(this.movie1CastResults)
        this.movie1CrewResults = this.movie1CastAndCrew.crew;
        this.movieService.getMovieCast(this.movie2.id).subscribe(
          response => {
            this.movie2CastAndCrew = response;
            console.log(this.movie2CastAndCrew)
            this.movie2CastResults = this.movie2CastAndCrew.cast;
            console.log(this.movie2CastResults)
            this.movie2CrewResults = this.movie2CastAndCrew.crew;
            this.getMovieDirector();
            this.addMoviesToDb();
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )

  }

  getMovieDirector(){
    this.movie1CrewResults.forEach(element => {
      if(element.job==="Director") this.movie1Director=element.name;
    });
    this.movie2CrewResults.forEach(element => {
      if(element.job==="Director") this.movie2Director=element.name;
    })
    console.log("Director1: ", this.movie1Director, " Director 2: ", this.movie2Director)
  }

  addMoviesToDb(){
    this.movieToDb.name = this.movie1.title;
    this.movieToDb.cast = this.movie1CastResults[0].name+", "+this.movie1CastResults[1].name+", "+this.movie1CastResults[2].name;
    this.movieToDb.director = this.movie1Director;
    this.movieToDb.rated = this.movie1.adult;
    this.movieToDb.evaluation = 5;
    this.movieToDb.releaseDate = this.movie1.release_date;
    this.movieToDb.reviews = this.movie1.overview;
    this.movieToDb.genre = "Horror";
    console.log("Prima di mandarlo è ", this.movieToDb);
    this.dataService.addEntry(this.movieToDb).subscribe(
      response => {
        console.log(response);
        this.movieToDb.name = this.movie2.title;
        this.movieToDb.cast = this.movie2CastResults[0].name+", "+this.movie2CastResults[1].name+", "+this.movie2CastResults[2].name;
        this.movieToDb.director = this.movie2Director;
        this.movieToDb.rated = this.movie2.adult;
        this.movieToDb.evaluation = 5;
        this.movieToDb.releaseDate = this.movie2.release_date;
        this.movieToDb.reviews = this.movie2.overview;
        this.movieToDb.genre = "Horror";
        this.dataService.addEntry(this.movieToDb).subscribe(
          response => console.log(response),
          error => console.log(error)
        )
      },
      error => console.log(error)
    )
  }



}


