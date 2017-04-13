/* eslint-env node*/

let __DEV__ = false;

try {
  __DEV__ = process.env.NODE_ENV !== 'production';
} catch (e) {} //eslint-disable-line

export const createReducer = (initialState, handlers) => {
  if (__DEV__ && handlers['undefined']) {
    console.warn( //eslint-disable-line
      'Reducer contains an \'undefined\' action type. ' +
      'Have you misspelled a constant?'
    );
  }

  return function reducer(state, action) {
    if (state === undefined) state = initialState;

    return handlers.hasOwnProperty(action.type)
      ? handlers[action.type](state, action)
      : state;
  };
};
