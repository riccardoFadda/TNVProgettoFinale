import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieListInterface, MoviesApiCastAndCrewInterface } from '../models/movieFromApi.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesFromApiService {

    private baseURL = 'https://api.themoviedb.org/3/movie/';
    private apiKey = "24a4cd53ea9a762873fb4acb15cdedd8";
    public randomNumber = this.getRandomInt(1,10);

    getRandomInt(min, max) : number{
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    constructor( private http : HttpClient) { }

    getMovies(){
        return this.http.get<MovieListInterface>(this.baseURL+"top_rated?api_key="+this.apiKey+"&page="+this.randomNumber);
    }

    getMovieCast(id: number){
      return this.http.get<MoviesApiCastAndCrewInterface>(this.baseURL+id+"/credits?api_key="+this.apiKey)
    }

}
