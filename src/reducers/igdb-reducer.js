import { ActionTypes } from '../actions';

const initialState = {
  resultsPreview: [],
  results: {},
  topRated: {},
  trending: {},
  selectedGame: null,
};

const IGDBReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case ActionTypes.IGDB_SEARCH_PREVIEW:
      return {
        ...state, resultsPreview: action.payload,
      };
    case ActionTypes.IGDB_SEARCH:
      return {
        ...state, results: action.payload,
      };
    case ActionTypes.IGDB_TOP_RATED:
      return {
        ...state, topRated: { games: action.games, covers: action.covers, years: action.years },
      };
    case ActionTypes.IGDB_TRENDING:
      return {
        ...state, trending: action.payload,
      };
    case ActionTypes.SELECT_GAME:
      return {
        ...state, selectedGame: action.payload,
      };
    case ActionTypes.CLEAR_SELECTED_GAME:
      return {
        ...state, selectedGame: null,
      };
    default:
      return state;
  }
};

export default IGDBReducer;
