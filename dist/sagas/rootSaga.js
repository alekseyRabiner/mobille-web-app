import scheduleSaga from './scheduleSaga';

export default function* () {
  yield [scheduleSaga()];
}
