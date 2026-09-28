export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

export interface MovieProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface MovieProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface MovieSpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface MovieDBDetailResponse {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: MovieCollection | null;
  budget: number;
  genres: MovieGenre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: MovieProductionCompany[];
  production_countries: MovieProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: MovieSpokenLanguage[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Entidad limpia para tu UI de React Native
export interface CompleteMovie {
  id: number;
  title: string;
  originalTitle: string;
  description: string;
  releaseDate: Date;
  poster: string;
  backdrop: string;
  rating: number;
  genres: string[];
  duration: number;
  budget: number;
  revenue: number;
  tagline: string;
  productionCompanies: string[];
}