//create user action types and creators
export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';

export const userCreationRequest = formData => ({
  type: CREATE_USER_REQUEST,
  payload: formData
});

export const createUserSuccess = successMessage => ({
  type: CREATE_USER_SUCCESS,
  payload: { successMessage },
});

export const createUserFailure = errorMessage => ({
  type: CREATE_USER_FAILURE,
  payload: { errorMessage },
});

