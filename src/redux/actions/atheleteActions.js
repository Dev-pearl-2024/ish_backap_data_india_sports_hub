export const FETH_ATHELETE_DATA_REQUEST = 'FETH_ATHELETE_DATA_REQUEST';
export const FETH_ATHELETE_DATA_SUCCESS = 'FETH_ATHELETE_DATA_SUCCESS';
export const FETH_ATHELETE_DATA_FAILURE = 'FETH_ATHELETE_DATA_FAILURE';


export const getAtheleteDataRequest = (userId) => ({
    type: FETH_ATHELETE_DATA_REQUEST,
    params: userId
  });
  
  export const getAtheleteDataSuccess = (data) => ({
    type: FETH_ATHELETE_DATA_SUCCESS,
    payload: data,
  });
  
  export const getAtheleteDataFailure = (error) => ({
    type: FETH_ATHELETE_DATA_FAILURE,
    payload: error,
  });
  