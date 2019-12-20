import {
  FETCH_SONGS,
  FETCH_SONGS_DONE,
  ADD_TO_FAVORITES_DONE,
  REMOVE_FROM_FAVORITES_DONE,
  Song
} from "../actions";

export type State = {
  loading: boolean,
  items: Array<Song>  
}

const initialState: State = {
  loading: false,
  items: []
};

const findAndToggle = (items: Array<Song>, id: number, value: boolean) => {
  return items.map(item => {
    if (item.id === id) return { ...item, isFavorite: value };
    return item;
  });
};

const addToFavorites = (state: State, id: number): State => {
  return { ...state, items: findAndToggle(state.items, id, true) };
};

const removeFromFavorites = (state: State, id: number): State => {
  return { ...state, items: findAndToggle(state.items, id, false) };
};

type Action = {
  type: string;
  payload: Array<Song>;
  id: number;
}

export default (state = initialState, action: Action) => {
  switch (action.type) {
    case FETCH_SONGS:
      return { loading: true, items: [] };
    case FETCH_SONGS_DONE:
      return { loading: false, items: action.payload };
    case ADD_TO_FAVORITES_DONE:
      return addToFavorites(state, action.id);
    case REMOVE_FROM_FAVORITES_DONE:
      return removeFromFavorites(state, action.id);
    default:
      return state;
  }
};
