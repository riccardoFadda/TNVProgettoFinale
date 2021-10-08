import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieRatingsInterface, MovieRatingsDataInterface } from '../models/movieRatings.model';

@Injectable({
  providedIn: 'root'
})
export class MovieratingsService {

  private baseURL = 'http://localhost:8000/api/movie_ratings';

  constructor(private http : HttpClient) { }

  getAllMovieRatings(){
    return this.http.get<MovieRatingsInterface>(this.baseURL);
  }

  getRatingsByMovieId(movie_id: number){
    return this.http.get<MovieRatingsInterface>(this.baseURL+"/movie_id/"+movie_id);
  }

  getRatingsByUserId(user_id: number){
    return this.http.get<MovieRatingsInterface>(this.baseURL+"/user_id/"+user_id);
  }

  getRatingsByMovieIdAndUserId(movie_id: number, user_id: number){
    return this.http.get<MovieRatingsInterface>(this.baseURL+"/movie_id/"+movie_id+"/user_id/"+user_id);
  }

  postMovieRating = (data: MovieRatingsDataInterface) => {
    console.log("Ho ricevuto", data);
    return this.http.post<MovieRatingsDataInterface>(this.baseURL, {
      "movie_id": data.movie_id,
      "user_id": data.user_id,
      "movie_rating": data.movie_rating
    });
  }

  deleteMovieRating( id ){
    return this.http.delete(this.baseURL + "/" + id);
  }
}
