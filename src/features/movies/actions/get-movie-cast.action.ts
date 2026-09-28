import { movieApi } from "@/shared/api/movie-api";
import { CastMember, MovieDBCreditsResponse } from "../interfaces/credits.interface";
import { CastMapper } from "../mappers/cast.mapper";

interface Props {
  id: number | string;
}

export const getMovieCastAction = async (
  { id }: Props,
  signal?: AbortSignal
): Promise<CastMember[]> => {
  try {
    const { data } = await movieApi.get<MovieDBCreditsResponse>(`/${id}/credits`, {
      signal,
    });

    return data.cast.map(CastMapper.fromTheMovieDBCastToEntity);
  } catch (error) {
    console.error(`Error loading cast for movie ${id}:`, error);
    return [];
  }
};