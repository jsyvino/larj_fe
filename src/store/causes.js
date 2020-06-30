
/**
 * INITIAL STATE
 */
const defaultCauses = {
  causeList: [],
  currentCause: {}
}

/**
 * ACTION TYPES
 */
const GET_CAUSES = 'GET_CAUSES'
const GET_CAUSE = 'GET_CAUSE'
const CLEAR_CURRENT_CAUSE = 'CLEAR_CURRENT_CAUSE'

/**
 * ACTION CREATORS
 */
export const getCauses = function (causeList) {
  return {
    type: GET_CAUSES,
    payload: causeList
  }
}

export const getCause = function (cause) {
  return {
    type: GET_CAUSE,
    payload: cause
  }
}

export const clearCause = function () {
  return {
    type: CLEAR_CURRENT_CAUSE,

  }
}

/**
 * THUNK CREATORS
 */

export const fetchCauseById = (id) => {
  return function thunk(dispatch) {
    return fetch(`http://127.0.0.1:8000/emails/cause/${id}`, {  // TODO: fix this
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(cause => {
        dispatch(getCause(cause))
    })
    .catch(error => console.warn(error))
  }
}

export function fetchCauses() {
  return function thunk(dispatch) {
    return fetch(`http://127.0.0.1:8000/emails/cause/`, {  // TODO: fix this
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
    .then(res => res.json())
    .then(causes => {
      dispatch(getCauses(causes))
    })
    .catch(error => console.warn(error))
  }
}

export function clearCurrentCause() {
  return function thunk(dispatch) {
    return dispatch(clearCause())
  }
}

/**
 * REDUCER
 */
export default function reducer(state = defaultCauses, action) {
  switch (action.type) {
    case GET_CAUSES:
      const causes = action.payload
      if (!causes) return state
      return {
        ...state,
        causeList: causes.map(cause => ({
          ...cause,
          recipient: cause.recipient.map(r => r.email_address),
        }))
      }
    case GET_CAUSE:
      const cause = action.payload
      const transformedCause = {
        ...cause,
        recipient: cause.recipient.map(r => r.email_address),
      }
      return {
        ...state,
        currentCause: transformedCause || state.currentCause
      }
      case CLEAR_CURRENT_CAUSE:
          return {
            ...state,
            currentCause: {}
          }
    default:
      return state;
  }
}
