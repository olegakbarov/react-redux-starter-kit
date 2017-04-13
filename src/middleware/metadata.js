
export default function createMiddleware() {
  return store => next => action => {
    const {
      currentCourseId,
      currentDayId
    } = (store.getState()).editor;

    if (
      action.meta &&
      action.meta.targetReducer &&
      action.meta.targetReducer === 'EDITOR'
    ) {
      action = {
        ...action,
        payload: {
          ...action.payload,
          currentCourseId,
          currentDayId
        }
      };
    }

    return next(action);
  };
}
