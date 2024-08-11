import { AppendToResponse, AppendToResponseMovieKey, MovieDetails, TMDB } from 'tmdb-ts';

const tmdb = new TMDB(import.meta.env.VITE_API_READ_ACCESS_TOKEN!);

export type MainMovie = AppendToResponse<
    MovieDetails,
    AppendToResponseMovieKey[] | undefined,
    "movie"
>;

export default tmdb
