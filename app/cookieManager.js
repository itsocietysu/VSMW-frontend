import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setUniqID(uniqID) {
  cookies.set('uniqID', uniqID, { path: '/' });
}

export function getUniqID() {
  return cookies.get('uniqID');
}
