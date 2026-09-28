import { QueryKey, useInfiniteQuery } from "@tanstack/react-query";
import { nowPlayingAction } from "../actions/now-playing.action";
import { popularAction } from "../actions/popular.action";

import { topRatedAction } from "../actions/top-rated.action";
import { upcomingAction } from "../actions/upcoming.action";
import { MoviesResponse } from "../interfaces/moviesResponse";

type MovieActionFn = (
  props: { page?: number; limit?: number },
  signal?: AbortSignal,
) => Promise<MoviesResponse>;

const usePaginatedMovies = (queryKey: QueryKey, fetcher: MovieActionFn) => {
  const query = useInfiniteQuery({
    queryKey,
    initialPageParam: 1,
    queryFn: ({ pageParam = 1, signal }) =>
      fetcher({ page: pageParam }, signal),
    staleTime: 1000 * 60 * 60 * 24, // 24 hrs
    getNextPageParam: (lastPage) =>
      lastPage?.page != null && lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined,
  });

  return {
    movies:
      query.data?.pages.flatMap((page) =>
        Array.isArray(page?.movies) ? page.movies : [],
      ) ?? [],
    isLoading: query.isLoading,
    isFetchingNextPage: query.isFetchingNextPage,
    nextLoadPage: () => {
      if (query.hasNextPage && !query.isFetchingNextPage) {
        query.fetchNextPage();
      }
    },
  };
};

export const useMovies = () => {
  const nowPlaying = usePaginatedMovies(
    ["movies", "nowPlaying"],
    nowPlayingAction,
  );
  const popular = usePaginatedMovies(["movies", "popular"], popularAction);
  const topRated = usePaginatedMovies(["movies", "topRated"], topRatedAction);
  const upcoming = usePaginatedMovies(["movies", "upcoming"], upcomingAction);

  return {
    nowPlaying,
    popular,
    topRated,
    upcoming,
  };
};
