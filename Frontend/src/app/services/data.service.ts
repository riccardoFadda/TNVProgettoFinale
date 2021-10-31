import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MovieData } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseURL = 'http://localhost:3000/data';

  constructor( private http : HttpClient) { }

  getData () {
    return this.http.get<Array<MovieData>>(this.baseURL)
  }

  getEntry( id ) {
    return this.http.get<MovieData>(this.baseURL + "/" + id)
  }

  addEntry = (data: MovieData) => {
    let apiId;
    if(data.apiId) apiId=data.apiId;
    else apiId=-1;
    return this.http.post<MovieData>(this.baseURL, {
      "name": data.name,
      "cast": data.cast,
      "director": data.director,
      "genre": data.genre,
      "rated": data.rated,
      "overview": data.overview,
      "evaluation": data.evaluation,
      "releaseDate": data.releaseDate,
      "addedBy": data.addedBy,
      "counter": 0,
      "apiId": apiId
    });
  };

  deleteEntry( id ){
    return this.http.delete(this.baseURL + "/" + id)
  }

  editEntry = (data: MovieData) => {
    return this.http.put(this.baseURL + '/' + data.id, {
      "id": data.id,
      "name": data.name,
      "cast": data.cast,
      "director": data.director,
      "genre": data.genre,
      "rated": data.rated,
      "overview": data.overview,
      "evaluation": data.evaluation,
      "releaseDate": data.releaseDate,
      "addedBy": data.addedBy,
      "counter": data.counter,
      "apiId": data.apiId
    });
  };

}
