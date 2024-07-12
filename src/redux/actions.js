import {
  FETCH_REQUEST_DETAILS,
  SET_SELECTED_REQUEST,
  CLEAR_SELECTED_REQUEST,
} from "./actionTypes";

export const fetchRequestDetails = (requestDetails) => ({
  type: FETCH_REQUEST_DETAILS,
  payload: requestDetails,
});

export const setSelectedRequest = (request) => ({
  type: SET_SELECTED_REQUEST,
  payload: request,
});

export const clearSelectedRequest = () => ({
  type: CLEAR_SELECTED_REQUEST,
});
