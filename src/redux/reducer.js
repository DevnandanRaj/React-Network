import { FETCH_REQUEST_DETAILS, SET_SELECTED_REQUEST, CLEAR_SELECTED_REQUEST } from './actionTypes';

const initialState = {
  requestDetails: [],
  selectedRequest: null,
};

const networkReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST_DETAILS:
      return {
        ...state,
        requestDetails: [...state.requestDetails, ...action.payload],
      };
    case SET_SELECTED_REQUEST:
      return {
        ...state,
        selectedRequest: action.payload,
      };
    case CLEAR_SELECTED_REQUEST:
      return {
        ...state,
        selectedRequest: null,
      };
    default:
      return state;
  }
};

export default networkReducer;
