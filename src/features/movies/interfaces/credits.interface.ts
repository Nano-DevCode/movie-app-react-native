export interface MovieDBCreditsResponse {
  id: number;
  cast: CastMemberDB[];
  crew: CrewMemberDB[];
}

export interface CastMemberDB {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMemberDB {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

// Entidad limpia para la UI
export interface CastMember {
  id: number;
  name: string;
  character: string;
  avatar: string;
}