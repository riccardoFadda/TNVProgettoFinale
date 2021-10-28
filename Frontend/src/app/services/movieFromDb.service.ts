import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieListInterface, MoviesApiCastAndCrewInterface } from '../models/movieFromApi.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesFromDbService {

    private baseURL = 'http://localhost:3000/data';


    constructor( private http : HttpClient) { }


    getRandomInt(min, max) : number{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    

    getMovies(){
        return this.http.get<MovieListInterface>(this.baseURL);
    }

    getMovieCast(id: number){
      return this.http.get<MoviesApiCastAndCrewInterface>(this.baseURL);
    }

}