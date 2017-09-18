import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

// Stripe sends back a token representing the charge, we send token to our API
// Our API confirms the charge was successful with Stripe
export const handleToken = token => async dispatch => {
  const res = await axios.post('/api/stripe', token);
  // Reuse the same user model with FETCH_USER action type in this action creator
  dispatch({ type: FETCH_USER, payload: res.data });
};
