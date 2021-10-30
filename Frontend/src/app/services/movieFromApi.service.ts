import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenresInterface, MovieListInterface, MoviesApiCastAndCrewInterface, MoviesApiDetailsInterface } from '../models/movieFromApi.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesFromApiService {

    private baseURL = 'https://api.themoviedb.org/3/';
    private apiKey = "24a4cd53ea9a762873fb4acb15cdedd8";

    getRandomInt(min, max) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    constructor( private http : HttpClient) { }

    getMovies(){
      return this.http.get<MovieListInterface>(this.baseURL+"movie/top_rated?api_key="+this.apiKey+"&page="+this.getRandomInt(1,463));
    }

    getMovieCastAndCrew(id: number){
      return this.http.get<MoviesApiCastAndCrewInterface>(this.baseURL+"movie/"+id+"/credits?api_key="+this.apiKey)
    }

    getGenres(){
      return this.http.get<GenresInterface>(this.baseURL+"genre/movie/list?api_key="+this.apiKey+"&language=en-US")
    }

    getMovieDetails(id: number){
      return this.http.get<MoviesApiDetailsInterface>(this.baseURL+"movie/"+id+"?api_key="+this.apiKey+"&language=en-US")
    }

}
