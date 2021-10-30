import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MovieApiInterface } from 'src/app/models/apiMovie.model';
import { MovieListInterface, MoviesApiResultsInterface, MoviesApiCastAndCrewInterface, MoviesApiCastResultsInterface, MoviesApiCrewResultsInterface, GenresResultsInterface } from '../../models/movieFromApi.model';
import { MoviesFromApiService } from '../../services/movieFromApi.service';
import { MovieData } from '../../models/data.model';
import { DataService } from '../../services/data.service';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from '../../models/user.model';

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

  genres: GenresResultsInterface[];

  currentUser: UserInterface;

  constructor(private movieService: MoviesFromApiService, private dataService: DataService, private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user.subscribe(
      response => {
        this.currentUser = response;
        this.movieService.getGenres().subscribe(
          response => {
            this.genres=response.genres;
            this.getMoviesApi();
          }
        )
      },
      error => console.log(error)
    )

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
        //console.log(response)
        do{
          randomMovie.movieData = response.results[this.movieService.getRandomInt(0,19)];
          if(randomMovie.movieData.id===previousId1 || randomMovie.movieData.id===previousId2) alreadyPresent=true;
          else alreadyPresent=false;
        } while(alreadyPresent===true)
        //console.log(randomMovie.movieData);
        this.movieService.getMovieCastAndCrew(randomMovie.movieData.id).subscribe(
          response => {
            console.log(response)
            randomMovie.movieCast = response.cast;
            randomMovie.movieCrew = response.crew;
            //console.log("cast: ", randomMovie.movieCast)
            //console.log("crew: ", randomMovie.movieCrew)
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
    var genre = this.pickGenre(movie.movieData.genre_ids[0]);
    movieToDb.genre = genre;
    movieToDb.addedBy = this.currentUser.id;

    //console.log("da mandare al db:", movieToDb);
  }

  pickGenre(id: number): string {
    var genre: string;
    this.genres.forEach(element => {
      if(element.id===id){
        genre = element.name;
      }
    });
    return genre;
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


