//fetch sports action types and creators
export const GET_SPORTS_DATA_REQUEST = 'GET_SPORTS_DATA_REQUEST';
export const GET_SPORTS_DATA_SUCCESS = 'GET_SPORTS_DATA_SUCCESS';
export const GET_SPORTS_DATA_FAILURE = 'GET_SPORTS_DATA_FAILURE';

export const getSportsDataRequest = () => ({
  type: GET_SPORTS_DATA_REQUEST,
});

export const getSportsDataSuccess = (data) => ({
  type: GET_SPORTS_DATA_SUCCESS,
  payload: data,
});

export const getSportsDataFailure = (error) => ({
  type: GET_SPORTS_DATA_FAILURE,
  payload: error,
});

//add favourites action types and creators
export const ADD_FAVOURITES_REQUEST = 'ADD_FAVOURITES_REQUEST';
export const ADD_FAVOURITES_SUCCESS = 'ADD_FAVOURITES_SUCCESS';
export const ADD_FAVOURITES_FAILURE = 'ADD_FAVOURITES_FAILURE';

export const addFavoutiteRequest = (data) => ({
  type: ADD_FAVOURITES_REQUEST,
  payload: data
});

export const addFavoutiteSuccess = (data) => ({
  type: ADD_FAVOURITES_SUCCESS,
  payload: data,
});

export const addFavoutiteFailure = (error) => ({
  type: ADD_FAVOURITES_FAILURE,
  payload: error,
});

//fetch Indian athelete action types and creators
export const FETCH_INDIAN_ATHL_REQUEST = 'FETCH_INDIAN_ATHL_REQUEST';
export const FETCH_INDIAN_ATHL_SUCCESS = 'FETCH_INDIAN_ATHL_SUCCESS';
export const FETCH_INDIAN_ATHL_FAILURE = 'FETCH_INDIAN_ATHL_FAILURE';

export const fetchIndianAtheleteRequest = () => ({
  type: FETCH_INDIAN_ATHL_REQUEST,
});

export const fetchIndianAtheletSuccess = (data) => ({
  type: FETCH_INDIAN_ATHL_SUCCESS,
  payload: data,
});

export const fetchIndianAtheletFailure = (error) => ({
  type: FETCH_INDIAN_ATHL_FAILURE,
  payload: error,
});

// actions/sportActions.js
export const SELECT_SPORT = 'SELECT_SPORT';

export const selectSport = (sportName) => ({
  type: SELECT_SPORT,
  payload: sportName,
});
