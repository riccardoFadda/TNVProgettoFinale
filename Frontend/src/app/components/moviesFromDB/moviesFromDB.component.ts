import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MovieData } from '../../models/data.model';
import { AuthService } from 'src/app/services/auth.service';
import { GenresResultsInterface } from 'src/app/models/movieFromApi.model';
import { UserInterface } from 'src/app/models/user.model';
import { MoviesFromApiService } from 'src/app/services/movieFromApi.service';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-moviesFromDB',
  templateUrl: './moviesFromDB.component.html',
  styleUrls: ['./moviesFromDB.component.css']
})
export class MoviesFromDBComponent implements OnInit {

  randomMovie1: {
    movieData: any,
    moviePoster: any
  } = {
    "movieData": 0,
    "moviePoster": 0
  }

  randomMovie2: {
    movieData: any,
    moviePoster: any
  } = {
    "movieData": 0,
    "moviePoster": 0
  }

  movies: MovieData[];

  constructor(private dataService:DataService,private auth: AuthService, private movieService: MoviesFromApiService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe(
      response => {
          this.movies=response;
          this.getMoviesDb();
      },
      error => console.log(error)
    )
  }

  getMoviesDb(){
    this.getRandomMovie(this.randomMovie1);
    this.getRandomMovie(this.randomMovie2);
  }

  getRandomMovie(randomMovie){
    let max = this.getMaxId();
    let randomId;
    let previousId1;
    let previousId2;
    if(this.randomMovie1.movieData.id) previousId1=this.randomMovie1.movieData.id;
    if(this.randomMovie2.movieData.id) previousId2=this.randomMovie2.movieData.id;
    do{
      randomId = this.movieService.getRandomInt(1,max);
    } while(this.checkExistentId(randomId)==false || randomId===previousId1 || randomId===previousId2)
    this.dataService.getEntry(randomId).subscribe(
      response => {
        randomMovie.movieData=response;
        console.log(randomMovie)
        this.getPoster(randomMovie);
      },
      error => console.log(error)
    )
  }

  getPoster(randomMovie){
    if(randomMovie.movieData.apiId===-1) randomMovie.moviePoster="./assets/img/logoNetFish.jpg"
    else{
      this.movieService.getMovieDetails(randomMovie.movieData.apiId).subscribe(
        response => randomMovie.moviePoster="http://image.tmdb.org/t/p/w185/"+response.poster_path,
        error => console.log(error)
      )
    }
  }

  checkExistentId(id: number): boolean{
    let found = false;
    this.movies.forEach(element => {
      if(element.id===id) found = true;
    });
    return found;
  }

  getMaxId(){
    return this.movies.slice(length-1)[0].id;
  };

  pickMovie(movie){
    let whichMovie;
    if(movie===this.randomMovie1) whichMovie=1;
    else whichMovie=2;

    movie.movieData.counter=movie.movieData.counter+1;
    this.dataService.editEntry(movie.movieData).subscribe(
      response=>{
        console.log(response);
        if(whichMovie===1) this.getRandomMovie(this.randomMovie2);
        else this.getRandomMovie(this.randomMovie1);
      },
      error => console.log(error)
    )

  }
}
