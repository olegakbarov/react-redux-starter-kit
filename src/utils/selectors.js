
import { createSelector } from 'reselect';

const selectState = () => state => state;

const currentCourseId = () => createSelector(
  selectState,
  state => state.currentCourseId
);

const currentDayId = () => createSelector(
  selectState,
  state => state.currentDayId
);

const selectCurrentMessages = () => createSelector(
  selectState,
  state => {
    if (state.courses) {
      return state.courses.getIn(
        [currentCourseId(), 'days', currentDayId(), 'messages']
      );
    } else {
      return null;
    }
  }
);

export {
  selectState,
  selectCurrentMessages
};

// const selectLocationState = () => {
//   let prevRoutingState;
//   let prevRoutingStateJS;
//
//   return (state) => {
//     const routingState = state.get('route'); // or state.route
//
//     if (!routingState.equals(prevRoutingState)) {
//       prevRoutingState = routingState;
//       prevRoutingStateJS = routingState.toJS();
//     }
//
//     return prevRoutingStateJS;
//   };
// };
