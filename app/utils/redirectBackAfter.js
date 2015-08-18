import stringifyLocation from './stringifyLocation';

export default function redirectBackAfter(path, state) {
  return ['/login', { redirectTo: stringifyLocation(state.location) }];
}
