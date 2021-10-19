import { Component, OnInit } from '@angular/core';
import { CommentsService } from 'src/app/services/comments.service';
import { MovieratingsService } from 'src/app/services/movieratings.service';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { MovieData } from 'src/app/models/data.model';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsInterface } from '../../models/comments.model';
import { MovieRatingsDataInterface } from '../../models/movieRatings.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  constructor(private ratingsService: MovieratingsService, private commentsService: CommentsService, private dataService: DataService,
    private auth: AuthService, private router: Router) { }

  movies: MovieData[];
  selectedMovie: MovieData;
  ratings = [1,2,3,4,5]
  movieId: number;
  userId: number;

  newComment: CommentsInterface;
  newRating: MovieRatingsDataInterface;

  ngOnInit(): void {
    this.getEntries();
    this.auth.user.subscribe(
      response => this.userId=response.id,
      error => console.log(error)
    )
  }

  onSubmit(form : NgForm){
    this.getMovieByName(form.form.value.selectedMovie);
    console.log(this.movieId);
    this.newComment = {
      movieId: this.movieId,
      userId: this.userId,
      body: form.form.value.comment
    }
    this.newRating = {
      movie_id: this.movieId,
      user_id: this.userId,
      movie_rating: form.form.value.rating
    }
    this.commentsService.postComment(this.newComment).subscribe(
      response => {
        console.log(response)
        this.ratingsService.postMovieRating(this.newRating).subscribe(
          response => {
            console.log(response)
            this.router.navigate(['/reviews'])
          },
          error => console.log(error)
        )
      },
      error => console.log(error)
    )


  }

  getEntries(){
    this.dataService.getData().subscribe(
      response => {
        this.movies = response;
        console.log(this.movies);
      },
      error => console.log(error)
    )
  }

  getMovieByName(movieName: string){
    this.movies.forEach(movie => {
      console.log("Confronto ", movie.name, " e ", movieName)
      if(movie.name==movieName){
        console.log("Il film è ", movie);
        this.movieId = movie.id;
      }
    });
  }
}
