
/**
 * INITIAL STATE
 */
const defaultEmails = {
    emailList: [],
  }

  /**
   * ACTION TYPES
   */
  const GET_EMAILS = 'GET_EMAILS'
  const CREATE_SENT = 'CREATE_SENT'

  /**
   * ACTION CREATORS
   */
  export const getEmails = function (emailList) {
    return {
      type: GET_EMAILS,
      payload: emailList
    }
  }

  export const createSent = function (email) {
      return {
        type: CREATE_SENT,
        payload: email
      }
    }

  /**
   * THUNK CREATORS
   */

  export function fetchSentEmails() {
    return function thunk(dispatch) {
      return fetch('http://127.0.0.1:8000/emails/sent/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
      })
      .then(res => res.json())
      .then(sentEmails => {
        dispatch(getEmails(sentEmails))
      })
      .catch(error => console.warn(error))
    }
  }

   export const recordEmail = (name, cause) => {
    return function thunk(dispatch) {
        return fetch('http://127.0.0.1:8000/emails/sent/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
            body: JSON.stringify({cause, name: encodeURIComponent(name)})
        })
        .then(res => res.json())
        .then(sentEmail => {
            dispatch(createSent(sentEmail))
        })
        .catch(error => {
            console.error(error)
        })
    }
  }

  /**
   * REDUCER
   */
  export default function reducer(state = defaultEmails, action) {
    switch (action.type) {
      case GET_EMAILS:
        return {
          ...state,
          emailList: action.payload || state.emailList
        }
      case CREATE_SENT:
        const newSent = action.payload
        if (!newSent) return state
        return {
            ...state,
            emailList: [...state.emailList, newSent]
          }
      default:
        return state;
    }
  }
