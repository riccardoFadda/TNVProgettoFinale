import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './routes/dashboard/dashboard.component'
import { AddComponent } from './routes/add/add.component';
import { DetailsComponent } from './routes/details/details.component';
import { EditComponent } from './routes/edit/edit.component';
import { LoginPageComponent } from './routes/login-page/login-page.component';
import { FilterByGenreComponent } from './routes/filter-by-genre/filter-by-genre.component';
import { WelcomePageComponent } from './routes/welcome-page/welcome-page.component';
import { SortByDateComponent } from './routes/sort-by-date/sort-by-date.component';
import { MoviesApiComponent } from './routes/movies-api/movies-api.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { AuthGuardService } from './services/auth-guard.service';
import { MatchMoviesComponent } from './components/matchMovies/matchMovies.component';
import { MoviesFromApiComponent } from './routes/moviesFromApi/moviesFromApi.component';
import { MoviesFromDBComponent } from './routes/moviesFromDB/moviesFromDB.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReviewComponent } from './components/review/review.component';
import { PopularComponent } from './routes/popular/popular.component';


const routes: Routes = [
  { path: "", redirectTo : '/welcome', pathMatch: 'full' },
  { path: "welcome", component: WelcomePageComponent},
  { path: "dashboard", component : DashboardComponent, canActivate: [AuthGuardService]},
  { path: "add", component : AddComponent, canActivate: [AuthGuardService] },
  { path: "details/:id", component : DetailsComponent, canActivate: [AuthGuardService] },
  { path: "edit/:id", component: EditComponent, canActivate: [AuthGuardService]},
  { path: "login", component: LoginPageComponent},
  { path: "filterByGenre", component: FilterByGenreComponent, canActivate: [AuthGuardService]},
  { path: "sortByDate", component:SortByDateComponent, canActivate: [AuthGuardService]},
  { path: "moviesApi", component: MoviesApiComponent, canActivate: [AuthGuardService]},
  { path: "reviews", component: ReviewsComponent, canActivate: [AuthGuardService]},
  { path: "matchMovies", component: MatchMoviesComponent, canActivate: [AuthGuardService]},
  { path: "matchFromApi", component: MoviesFromApiComponent, canActivate: [AuthGuardService]},
  { path: "matchFromDb", component: MoviesFromDBComponent, canActivate: [AuthGuardService]},
  { path: "sign-up", component: SignUpComponent},
  { path: "review", component: ReviewComponent, canActivate: [AuthGuardService]},
  { path: "popular", component: PopularComponent, canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
