export default function(redux, nextState, components) {
  return Promise.all(components.map(async Component => {
    Component = Component && Component.WrappedComponent || Component;

    if (!Component || !Component.fillStore) { return; }

    await Component.fillStore(redux, nextState);
  }));
}
