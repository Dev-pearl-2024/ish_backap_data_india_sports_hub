//create user action types and creators
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const userCreationRequest = (formData) => ({
  type: CREATE_USER_REQUEST,
  payload: formData
});

export const createUserSuccess = (successMessage) => ({
  type: CREATE_USER_SUCCESS,
  payload: { successMessage },
});

export const createUserFailure = (errorMessage) => ({
  type: CREATE_USER_FAILURE,
  payload: { errorMessage },
});

//create user action types and creators
export const FETCH_USER_NAME_REQUEST = 'FETCH_USER_NAME_REQUEST';
export const FETCH_USER_NAME_SUCCESS = 'FETCH_USER_NAME_SUCCESS';
export const FETCH_USER_NAME_FAILURE = 'FETCH_USER_NAME_FAILURE';

export const userNameRequest = (firstname) => ({
  type: FETCH_USER_NAME_REQUEST,
  payload: firstname
});

export const userNameSuccess = (successMessage) => ({
  type: FETCH_USER_NAME_SUCCESS,
  payload: { successMessage },
});

export const userNameFailure = (errorMessage) => ({
  type: FETCH_USER_NAME_FAILURE,
  payload: { errorMessage },
});
