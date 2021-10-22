import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieApiInterface } from '../models/apiMovie.model';

@Injectable({
  providedIn: 'root'
})
export class MoviesApiService {

  private baseURL = 'https://api.themoviedb.org/3/movie/popular?';
  private apiKey = "24a4cd53ea9a762873fb4acb15cdedd8";
  public randomNumber = this.getRandomInt(1,50);

  getRandomInt(min, max) : number{
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; 
  };

  constructor( private http : HttpClient) { }

  getMoviesList(){ 
      return this.http.get<MovieApiInterface>(this.baseURL+"api_key="+this.apiKey+"&page="+this.randomNumber);
  }

}
