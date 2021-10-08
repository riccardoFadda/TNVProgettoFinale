export interface MovieRatingsInterface{
  author: string,
  version: string,
  data: MovieRatingsDataInterface[]
}

export interface MovieRatingsDataInterface{
  movie_id: number,
  movie_rating: number,
  user_id: number
}
