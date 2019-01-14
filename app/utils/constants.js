export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

const startApiUri = 'http://193.124.206.136:4200/vsmw';
export const apiUri = {
  current_object: `${startApiUri}/current_object`,
  get_session: sessionID => `${startApiUri}/session/${sessionID}`,
  get_stats: sessionID => `${startApiUri}/stats/${sessionID}`,
  get_vote: (sessionID, uniqID) => `${startApiUri}/vote/${sessionID}/${uniqID}`,
  send_vote: `${startApiUri}/vote`,
};
