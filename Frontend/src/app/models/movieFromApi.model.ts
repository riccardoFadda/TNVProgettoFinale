export interface MovieListInterface{
        poster_path: string,
        overview: string,
        release_date: string,
        genre_ids: number[],
        id: number,
        title: string,
        data: MoviesApiResultsInterface []
    
    }
    
    export interface MoviesApiResultsInterface{
        page: number,
        results: any[],
        total_results: number,
        total_pages: number
    }

  