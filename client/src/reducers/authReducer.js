import { FETCH_USER } from '../actions/types';

// If it's unclear if the user is actually logged in, return null, e.g. slow internet connection.
export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      // If you hear back from request and FETCH_USER action,
      // return the user model (payload) if user is logged in or false if user is logged out.
      // NOTE: if user is not logged in, then an empty string is returned, which JavaScript interprets as falsy
      return action.payload || false;
    default:
      return state;
  }
}
