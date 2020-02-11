// @flow
/**
 * @module Actions/User
 * @desc User Actions
 */
import { createActions } from 'redux-actions';

import { ActionTypes } from '../constants/index';

export const { conditionsGetRepos: getRepos } = createActions({
  [ActionTypes.CONDITIONS_GET_REPOS]: (query: string) => ({ query }),
});
