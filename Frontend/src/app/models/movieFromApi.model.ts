export interface MovieListInterface{

        page: number,
        results: any[],
        total_results: number,
        total_pages: number
    }

    export interface MoviesApiResultsInterface{
        adult: boolean,
        poster_path: string,
        overview: string,
        release_date: Date,
        genre_ids: number[],
        id: number,
        title: string,
        vote_average: number,
        data: MoviesApiResultsInterface []
    }

    export interface MoviesApiCastAndCrewInterface{
      cast: MoviesApiCastResultsInterface[],
      crew: MoviesApiCrewResultsInterface[]
    }

    export interface MoviesApiCastResultsInterface{
      name: string,
    }

    export interface MoviesApiCrewResultsInterface{
      name: string,
      job: string
    }

    export interface GenresInterface{
      genres: GenresResultsInterface[]
    }

    export interface GenresResultsInterface{
      id: number,
      name: string
    }

    export interface MoviesApiDetailsInterface{
      poster_path: string
    }
