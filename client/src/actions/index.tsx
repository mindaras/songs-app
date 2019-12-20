export const FETCH_SONGS = 'fetch_songs';
export const FETCH_SONGS_DONE = 'fetch_songs_done';
export const ADD_TO_FAVORITES = 'add_to_favorites';
export const ADD_TO_FAVORITES_DONE = 'add_to_favorites_done';
export const REMOVE_FROM_FAVORITES = 'remove_from_favorites';
export const REMOVE_FROM_FAVORITES_DONE = 'remove_from_favorites_done';

export type SearchType = "term" | "id"

export type FetchSongsProps = {
  input: string,
  searchType: SearchType
}

export interface FetchSongsAction extends FetchSongsProps {
  type: typeof FETCH_SONGS;
  input: string;
  searchType: SearchType;
}

export const fetchSongs = ({ input, searchType }: FetchSongsProps): FetchSongsAction => ({
  type: FETCH_SONGS,
  input,
  searchType
});

export type Song = {
  trackPrice: number;
  artistName: string;
  releaseDate: string;
  id: number;
  isFavorite: boolean;
}

export type FetchSongsDoneAction = {
  type: typeof FETCH_SONGS_DONE;
  payload: Array<Song>;
}

export const fetchSongsDone = (payload: Array<Song>): FetchSongsDoneAction => ({
  type: FETCH_SONGS_DONE,
  payload
});

export type FavoritesAction = {
  type: typeof ADD_TO_FAVORITES | typeof ADD_TO_FAVORITES_DONE | typeof REMOVE_FROM_FAVORITES | typeof REMOVE_FROM_FAVORITES_DONE;
  id: number;
}

export const addToFavorites = (id: number): FavoritesAction => ({ type: ADD_TO_FAVORITES, id });
export const addToFavoritesDone = (id: number): FavoritesAction => ({ type: ADD_TO_FAVORITES_DONE, id });
export const removeFromFavorites = (id: number): FavoritesAction => ({ type: REMOVE_FROM_FAVORITES, id });
export const removeFromFavoritesDone = (id: number): FavoritesAction => ({ type: REMOVE_FROM_FAVORITES_DONE, id });
