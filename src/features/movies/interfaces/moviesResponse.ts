import { Movie } from "./movie.interface";

export interface MoviesResponse {
  page: number;
  totalPages: number;
  movies: Movie[];
}