import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './routes/dashboard/dashboard.component';
import { DataService } from './services/data.service';
import { HttpClientModule } from '@angular/common/http';
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './routes/edit/edit.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { LoadingPageComponent } from './components/loading-page/loading-page.component';
import { FilterByGenreComponent } from './routes/filter-by-genre/filter-by-genre.component';
import { GenrePipePipe } from './pipes/genrePipe/genre-pipe.pipe';
import { WelcomePageComponent } from './routes/welcome-page/welcome-page.component';
import { SortByDateComponent } from './routes/sort-by-date/sort-by-date.component';
import { MoviesApiComponent } from './routes/movies-api/movies-api.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { MovieratingsService } from './services/movieratings.service';
import { CommentsService } from './services/comments.service';
import { MoviesApiService } from './services/moviesapi.service';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MatchMoviesComponent } from './components/matchMovies/matchMovies.component';
import { MoviesFromDBComponent } from './routes/moviesFromDB/moviesFromDB.component';
import { MoviesFromApiComponent } from './routes/moviesFromApi/moviesFromApi.component';
import { MoviesFromApiService } from './services/movieFromApi.service';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LoginPageComponent,
    LoadingPageComponent,
    FilterByGenreComponent,
    GenrePipePipe,
    WelcomePageComponent,
    SortByDateComponent,
    MoviesApiComponent,
    ReviewsComponent,
    MatchMoviesComponent,
    MoviesFromDBComponent,
    MoviesFromApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DataService, AuthService, UserService, MovieratingsService, CommentsService, MoviesApiService,MoviesFromApiService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
