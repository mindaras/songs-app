import { mergeMap, map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import { ofType, combineEpics, Epic, ActionsObservable } from "redux-observable";
import {
  FETCH_SONGS,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  fetchSongsDone,
  addToFavoritesDone,
  removeFromFavoritesDone,
  FavoritesAction,
  FetchSongsAction,
  Song,
  SearchType,
  FetchSongsProps
} from "../actions";
import endpoints from "../endpoints.json";

const addToFavorites: Epic<FavoritesAction> = action$ => {
  return action$.pipe(
    ofType(ADD_TO_FAVORITES),
    mergeMap(({ id }: { id: number }) => {
      return ajax
        .post(
          endpoints.favorites,
          { id },
          { "Content-Type": "application/json" }
        )
        .pipe(map(() => addToFavoritesDone(id)));
    })
  );
};

const removeFromFavorites: Epic<FavoritesAction> = action$ => {
  return action$.pipe(
    ofType(REMOVE_FROM_FAVORITES),
    mergeMap(({ id }: { id: number }) => {
      return ajax
        .delete(`${endpoints.favorites}/${id}`)
        .pipe(map(() => removeFromFavoritesDone(id)));
    })
  );
};

const getSongsEndpoint = (input: string, searchType: SearchType) => {
  if (searchType === "term") {
    return `${endpoints.songsByTerm}/${encodeURIComponent(input)}`;
  }
  return `${endpoints.songsById}/${encodeURIComponent(input)}`;
};

type SongsResponse = {
  results: Array<Song>
}

const fetchSongs = (action$: ActionsObservable<FetchSongsAction>) => {
  return action$.pipe(
    ofType(FETCH_SONGS),
    mergeMap(({ input, searchType }: FetchSongsProps) => {
      const endpoint = getSongsEndpoint(input, searchType);
      return ajax
        .getJSON<SongsResponse>(endpoint)
        .pipe(map(response => fetchSongsDone(response.results)));
    })
  );
};

export default combineEpics(addToFavorites, removeFromFavorites, fetchSongs);
