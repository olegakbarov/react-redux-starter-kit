export default function(redux, nextState, components) {
  return Promise.all(components.map(async Component => {
    Component = Component && Component.DecoratedComponent || Component;

    if (!Component || !Component.fillStore) { return; }

    await Component.fillStore(redux, nextState);
  }));
}
