import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMTeam, defaultValue } from 'app/shared/model/m-team.model';

export const ACTION_TYPES = {
  FETCH_MTEAM_LIST: 'mTeam/FETCH_MTEAM_LIST',
  FETCH_MTEAM: 'mTeam/FETCH_MTEAM',
  CREATE_MTEAM: 'mTeam/CREATE_MTEAM',
  UPDATE_MTEAM: 'mTeam/UPDATE_MTEAM',
  DELETE_MTEAM: 'mTeam/DELETE_MTEAM',
  SET_BLOB: 'mTeam/SET_BLOB',
  RESET: 'mTeam/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMTeam>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MTeamState = Readonly<typeof initialState>;

// Reducer

export default (state: MTeamState = initialState, action): MTeamState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MTEAM_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MTEAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MTEAM):
    case REQUEST(ACTION_TYPES.UPDATE_MTEAM):
    case REQUEST(ACTION_TYPES.DELETE_MTEAM):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MTEAM_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MTEAM):
    case FAILURE(ACTION_TYPES.CREATE_MTEAM):
    case FAILURE(ACTION_TYPES.UPDATE_MTEAM):
    case FAILURE(ACTION_TYPES.DELETE_MTEAM):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MTEAM_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MTEAM):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MTEAM):
    case SUCCESS(ACTION_TYPES.UPDATE_MTEAM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MTEAM):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.SET_BLOB:
      const { name, data, contentType } = action.payload;
      return {
        ...state,
        entity: {
          ...state.entity,
          [name]: data,
          [name + 'ContentType']: contentType
        }
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/m-teams';

// Actions

export const getEntities: ICrudGetAllAction<IMTeam> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MTEAM_LIST,
    payload: axios.get<IMTeam>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMTeam> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MTEAM,
    payload: axios.get<IMTeam>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMTeam> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MTEAM,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMTeam> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MTEAM,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMTeam> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MTEAM,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const setBlob = (name, data, contentType?) => ({
  type: ACTION_TYPES.SET_BLOB,
  payload: {
    name,
    data,
    contentType
  }
});

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
