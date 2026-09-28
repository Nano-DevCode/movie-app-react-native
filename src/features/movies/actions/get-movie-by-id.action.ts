import { movieApi } from "@/shared/api/movie-api";
import {
  CompleteMovie,
  MovieDBDetailResponse,
} from "../interfaces/movie-detail.interface";
import { MovieMapper } from "../mappers/movie.mapper";

interface Props {
  id: number | string;
}

export const getMovieByIdAction = async (
  { id }: Props,
  signal?: AbortSignal
): Promise<CompleteMovie> => {
  if (!id) {
    throw new Error("El ID de la película es requerido");
  }

  try {
    const { data } = await movieApi.get<MovieDBDetailResponse>(`/${id}`, {
      signal,
    });

    return MovieMapper.fromTheMovieDBToCompleteMovie(data);
   
  } catch (error) {
    console.error(`Error al cargar el detalle de la película con ID ${id}:`, error);
    throw new Error(`No se pudo cargar la película con ID ${id}`);
  }
};