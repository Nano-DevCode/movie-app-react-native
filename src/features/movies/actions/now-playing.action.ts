import { movieApi } from "@/shared/api/movie-api";
import { MovieDBMoviesResponse } from "../interfaces/moviedb-response.interface";
import { MoviesResponse } from "../interfaces/moviesResponse";
import { MovieMapper } from "../mappers/movie.mapper";

interface Props {
  page?: number;
  limit?: number;
}

export const nowPlayingAction = async (
  { page = 1, limit = 10 }: Props = {},
  signal?: AbortSignal
): Promise<MoviesResponse> => {
  try {
    const { data } = await movieApi.get<MovieDBMoviesResponse>("/now_playing", {
      params: { 
        page 
      },
      signal,
    });

    return {
      page: data?.page ?? page,
      totalPages: data?.total_pages ?? 1,
      movies: data?.results
        ? data.results.map(MovieMapper.fromTheMovieDBToMovie)
        : [],
    };
  } catch (error) {
    console.error("Error fetching now playing movies:", error);
    throw new Error("Can not load now playing movies");
  }
};