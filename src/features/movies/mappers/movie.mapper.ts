import {
  CompleteMovie,
  MovieDBDetailResponse,
} from "../interfaces/movie-detail.interface";
import { Movie } from "../interfaces/movie.interface";
import { Result } from "../interfaces/moviedb-response.interface";

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_BACKDROP_HD_URL = "https://image.tmdb.org/t/p/w1280";

// Fallbacks con servicio rápido y HTTPS estable para móviles
const FALLBACK_POSTER =
  "https://placehold.co/500x750/1e293b/ffffff.png?text=No+Poster";
const FALLBACK_BACKDROP =
  "https://placehold.co/1280x720/1e293b/ffffff.png?text=No+Backdrop";

export class MovieMapper {
  // 1. Para listados generales (Cartelera, Populares, etc.)
  static fromTheMovieDBToMovie = (movie: Result): Movie => {
    const parsedDate = movie.release_date ? new Date(movie.release_date) : null;
    const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

    return {
      id: movie.id,
      title: movie.title,
      description: movie.overview || "Sin descripción disponible.",
      releaseDate: isValidDate ? parsedDate : new Date(),
      poster: movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : FALLBACK_POSTER,
      backdrop: movie.backdrop_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`
        : FALLBACK_BACKDROP,
      rating:
        movie.vote_average != null ? Number(movie.vote_average.toFixed(1)) : 0,
    };
  };

  // 2. Para el detalle profundo de una película individual por ID
  static fromTheMovieDBToCompleteMovie = (
    movie: MovieDBDetailResponse
  ): CompleteMovie => {
    const parsedDate = movie.release_date ? new Date(movie.release_date) : null;
    const isValidDate = parsedDate && !isNaN(parsedDate.getTime());

    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title ?? movie.title,
      description: movie.overview || "Sin descripción disponible.",
      releaseDate: isValidDate ? parsedDate : new Date(),
      poster: movie.poster_path
        ? `${TMDB_IMAGE_BASE_URL}${movie.poster_path}`
        : FALLBACK_POSTER,
      backdrop: movie.backdrop_path
        ? `${TMDB_BACKDROP_HD_URL}${movie.backdrop_path}`
        : FALLBACK_BACKDROP,
      rating:
        movie.vote_average != null ? Number(movie.vote_average.toFixed(1)) : 0,
      genres: movie.genres ? movie.genres.map((g) => g.name) : [],
      duration: movie.runtime ?? 0,
      budget: movie.budget ?? 0,
      revenue: movie.revenue ?? 0,
      tagline: movie.tagline || "",
      productionCompanies: movie.production_companies
        ? movie.production_companies.map((c) => c.name)
        : [],
    };
  };
}