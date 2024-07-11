import {
  FETCH_REQUEST_DETAILS,
  SET_SELECTED_REQUEST,
  CLEAR_SELECTED_REQUEST,
} from "./actionTypes";

export const fetchRequestDetails = (requests) => ({
  type: FETCH_REQUEST_DETAILS,
  payload: requests,
});

export const setSelectedRequest = (request) => ({
  type: SET_SELECTED_REQUEST,
  payload: request,
});

export const clearSelectedRequest = () => ({
  type: CLEAR_SELECTED_REQUEST,
});
