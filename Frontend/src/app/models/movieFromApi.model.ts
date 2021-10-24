export interface MovieListInterface{
      
        page: number,
        results: any[],
        total_results: number,
        total_pages: number
    }
    
    export interface MoviesApiResultsInterface{
        poster_path: string,
        overview: string,
        release_date: string,
        genre_ids: number[],
        id: number,
        title: string,
        vote_average: number,
        // data: MoviesApiResultsInterface []
    }

  