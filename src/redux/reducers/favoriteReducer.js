import {
  GET_FAVORITE_DATA_REQUEST,
  GET_FAVORITE_DATA_SUCCESS,
  GET_FAVORITE_DATA_FAILURE,
} from '../actions/favoriteAction';

const initialState = {
  favoriteData: [],
  error: null,
  isLoading: false,
};

const favoriteReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FAVORITE_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_FAVORITE_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_FAVORITE_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default favoriteReducer;
