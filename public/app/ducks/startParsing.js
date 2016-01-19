
import Parse from '../API/parse'

const initialState = {
  isLoading: false,
  results: []
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;

  switch(type) {
    case 'SEARCH':
      return Object.assign(
        {},
        state,
        payload ? {
          results: payload,
          isLoading: false
        }
          :
        {
          results: [],
          isLoading: true
        }
      );

    default:
      return state;
  }
}

export function parse(rules) {
  return async function(dispatch, getState) {
    dispatch({
      type: 'SEARCH'
    });

    const results = await Parse(rules);

    return dispatch({
      type: 'SEARCH',
      payload: results
    });
  };
}
