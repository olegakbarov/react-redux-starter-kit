// export function fetchDataBeforeRender(dispatch, components, params) {
//   debug('components', components);
//   debug(params);
//
//   const comps = components.reduce((prev, current) => {
//     return (current.fetchData || [])
//       .concat((current.WrappedComponent
//         ? current.WrappedComponent.fetchData
//         : []) || []
//       )
//       .concat(prev);
//   }, []);
//
//   debug('comps', comps);
//   const promises = comps.map(fetchData => dispatch(fetchData()));
//   return Promise.all(promises);
// }


export function fetchDataBeforeRender(renderProps, store) {
  const { params, components } = renderProps;

  return Promise.all(components
    .filter((component) => typeof component.WrappedComponent === 'function' &&
      typeof component.WrappedComponent.fetchData === 'function')
    .map((component) => component.WrappedComponent.fetchData({ store })));
}
