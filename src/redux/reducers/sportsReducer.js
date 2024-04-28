import {
  GET_SPORTS_DATA_REQUEST,
  GET_SPORTS_DATA_SUCCESS,
  GET_SPORTS_DATA_FAILURE,
  ADD_FAVOURITES_REQUEST,
  ADD_FAVOURITES_SUCCESS,
  ADD_FAVOURITES_FAILURE,
  FETCH_INDIAN_ATHL_REQUEST,
  FETCH_INDIAN_ATHL_SUCCESS,
  FETCH_INDIAN_ATHL_FAILURE,
  SELECT_SPORT 
} from '../actions/sportsActions';

const initialState = {
  data: [],
  indianAthleteData: {},
  error: null,
  isLoading: false,
  selectedSport: null,
};

const sportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SPORTS_DATA_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case GET_SPORTS_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case GET_SPORTS_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ADD_FAVOURITES_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ADD_FAVOURITES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case ADD_FAVOURITES_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case FETCH_INDIAN_ATHL_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case FETCH_INDIAN_ATHL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        indianAthleteData: action.payload,
      };
    case FETCH_INDIAN_ATHL_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case SELECT_SPORT:
      return {
        ...state,
        selectedSport: action.payload,
      };
    default:
      return state;
  }
};

export default sportReducer;
