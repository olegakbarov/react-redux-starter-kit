import stringifyLocation from './stringifyLocation';

export default function redirectBackAfter(path, location) {
  return ['/login', { redirectTo: stringifyLocation(location) }];
}
