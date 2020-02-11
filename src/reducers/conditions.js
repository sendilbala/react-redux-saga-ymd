import { parseError } from '../modules/client';
import { handleActions } from '../modules/helpers';

import { ActionTypes, STATUS } from '../constants/index';

export const conditionsState = {
  repos: {
    data: {},
    status: STATUS.IDLE,
    message: '',
    query: '',
  },
};

export default {
  conditions: handleActions(
    {
      [ActionTypes.CONDITIONS_GET_REPOS]: (draft, { payload }) => {
        draft.repos.data[payload.query] = draft.repos.data[payload.query]
          ? draft.repos.data[payload.query]
          : [];
        draft.repos.message = '';
        draft.repos.query = payload.query;
        draft.repos.status = STATUS.RUNNING;
      },
      [ActionTypes.CONDITIONS_GET_REPOS_SUCCESS]: (draft, { payload }) => {
        draft.repos.data[draft.repos.query] = payload.data || [];
        draft.repos.status = STATUS.SUCCESS;
      },
      [ActionTypes.CONDITIONS_GET_REPOS_FAILURE]: (draft, { payload }) => {
        draft.repos.message = parseError(payload.message);
        draft.repos.status = STATUS.ERROR;
      },
    },
    conditionsState,
  ),
};
