/**
 * INITIAL STATE
 */
const defaultUser = {
  name: "",
  location: ""
};

/**
 * ACTION TYPES
 */
const SET_NAME = 'SET_NAME';
const SET_LOCATION = 'SET_LOCATION'

/**
 * ACTION CREATORS
 */
export const setName = function (name) {
  return {
    type: SET_NAME,
    payload: name
  };
};

export const setLocation = function (location) {
    return {
      type: SET_LOCATION,
      payload: location
    };
  };

/**
 * THUNK CREATORS
 */

export const setUserName = (name) => {
  return function thunk(dispatch) {
      dispatch(setName(name))
  }
}

export const setUserLocation = (location) => {
    return function thunk(dispatch) {
        dispatch(setLocation(location))
    }
  }

/**
 * REDUCER
 */
export default function reducer(state = defaultUser, action) {
  switch (action.type) {
    case SET_NAME:
      return {
        ...state,
        name: action.payload
      }
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    default:
      return state;
  }
}
