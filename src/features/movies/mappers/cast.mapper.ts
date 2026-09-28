import { CastMember, CastMemberDB } from "../interfaces/credits.interface";

const TMDB_PROFILE_URL = "https://image.tmdb.org/t/p/w185";
const FALLBACK_AVATAR = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80";

export class CastMapper {
  static fromTheMovieDBCastToEntity(cast: CastMemberDB): CastMember {
    return {
      id: cast.id,
      name: cast.name,
      character: cast.character || "Personaje sin nombre",
      avatar: cast.profile_path
        ? `${TMDB_PROFILE_URL}${cast.profile_path}`
        : FALLBACK_AVATAR,
    };
  }
}