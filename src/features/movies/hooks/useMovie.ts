import { useQuery } from "@tanstack/react-query";
import { getMovieByIdAction } from "../actions/get-movie-by-id.action";
import { getMovieCastAction } from "../actions/get-movie-cast.action";

export const useMovie = (id?: number | string | null) => {
  const numericId = Number(id);
  const isValidId = Boolean(id) && !isNaN(numericId) && numericId > 0;

  const movieQuery = useQuery({
    queryKey: ["movie", numericId],
    queryFn: ({ signal }) => getMovieByIdAction({ id: numericId }, signal),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: isValidId,
  });

  const castQuery = useQuery({
    queryKey: ["movie", numericId, "cast"],
    queryFn: ({ signal }) => getMovieCastAction({ id: numericId }, signal),
    staleTime: 1000 * 60 * 60 * 24,
    enabled: isValidId,
  });

  return {
    movie: movieQuery.data,
    cast: castQuery.data ?? [],
    isLoading: isValidId ? (movieQuery.isLoading || castQuery.isLoading) : false,
    isError: isValidId ? movieQuery.isError : false,
    refetch: () => {
      if (isValidId) {
        movieQuery.refetch();
        castQuery.refetch();
      }
    },
  };
};

