import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { MovieratingsService } from '../../services/movieratings.service';
import { CommentsService } from '../../services/comments.service';
import { MovieData } from '../../models/data.model';
import { CommentsInterface } from 'src/app/models/comments.model';
import { MovieRatingsDataInterface } from 'src/app/models/movieRatings.model';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { toJSDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';
import { UserInterface } from 'src/app/models/user.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  constructor(private dataService: DataService, private ratingService: MovieratingsService, private commentService: CommentsService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.getEntries();
  }

  movies: MovieData[];
  selectedMovie: MovieData;

  comments: CommentsInterface[];
  filteredComments: CommentsInterface[] = [];

  ratings: MovieRatingsDataInterface[];
  filteredRatings: MovieRatingsDataInterface[] = [];

  users: UserInterface[];
  filteredUsers: UserInterface[] = [];

  getEntries(){
    this.dataService.getData().subscribe(
      response => {
        this.movies = response;
        console.log(this.movies);
      },
      error => console.log(error)
    )

    this.commentService.getAllComments().subscribe(
      response => {
        this.comments = response;
        console.log(this.comments);
      },
      error => console.log(error)
    )

    this.ratingService.getAllMovieRatings().subscribe(
      response => {
        this.ratings = response.data;
        console.log(this.ratings);
      },
      error => console.log(error)
    )

    this.userService.getAllUsers().subscribe(
      response => {
        this.users = response;
        console.log(this.users);
      },
      error => console.log(error)
    )

  }

  getMovieByName(movieName: string){
    this.movies.forEach(movie => {
      console.log("Confronto ", movie.name, " e ", movieName)
      if(movie.name==movieName){
        console.log("Il film è ", movie);
        this.selectedMovie = movie;
      }
    });
  }

  filterRatingsByMovie(movie: MovieData){
    this.ratings.forEach(rating => {
      if(rating.movie_id==movie.id) {
        console.log("Confronto ", rating.movie_id, " e ", movie.id)
        this.filteredRatings.push(rating);
      }
    });
  }

  filterCommentsByMovie(movie: MovieData){
    this.comments.forEach(comment => {
      if(comment.movieId==movie.id) {
        console.log("Confronto ", comment.movieId, " e ", movie.id)
        this.filteredComments.push(comment);
      }
    });
  }

  filterUsers(){
    this.filteredComments.forEach(comment => {
      this.users.forEach(user => {
        console.log("confronto ", comment, " e ", user)
        if(comment.userId==user.id) {
          this.filteredUsers.push(user);
        }
      })
    })
  }

  selectMovie(selectedMovie: NgForm){
    this.filteredComments.length = 0;
    this.filteredRatings.length = 0;
    this.filteredUsers.length = 0;
    this.getMovieByName(selectedMovie.form.value.selectedMovie);
    console.log("film: ", this.selectedMovie)
    this.filterRatingsByMovie(this.selectedMovie);
    console.log("rating filtrati: ", this.filteredRatings);
    this.filterCommentsByMovie(this.selectedMovie);
    console.log("comments filtrati: ", this.filteredComments);
    this.filterUsers();
    this.filteredComments.sort((a, b) => {
      return a.userId - b.userId;
    });
    this.filteredRatings.sort((a, b) => {
      return a.user_id - b.user_id;
    });
    this.filteredUsers.sort((a, b) => {
      return a.id - b.id;
    });
    console.log(this.filteredUsers);
  }

}
