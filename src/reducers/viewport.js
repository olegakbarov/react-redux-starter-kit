import Immutable from 'immutable';
import { SET_VIEWPORT } from 'viewport.js';

export const initialState = Immutable.Map({
  isMobile: false,
  isTablet: false,
  isTouchDevice: 'ontouchstart' in window || 'onmsgesturechange' in window,
  isDesktop: true
});

// viewport handler
export const viewportReducer = (state = initialState, action) => {
  switch(action.type) {
    case (SET_VIEWPORT):
      return state.merge(Immutable.Map({
        isTouchDevice: 'ontouchstart' in window || 'onmsgesturechange' in window,
        isMobile: action.width < 768,
        isTablet: action.width  >= 768 && action.width < 1024,
        isDesktop: action.width >= 1024
      }));
    default: return state;
  }
};
