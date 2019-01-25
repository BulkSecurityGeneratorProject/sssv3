import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMEkspedisi, defaultValue } from 'app/shared/model/m-ekspedisi.model';

export const ACTION_TYPES = {
  FETCH_MEKSPEDISI_LIST: 'mEkspedisi/FETCH_MEKSPEDISI_LIST',
  FETCH_MEKSPEDISI: 'mEkspedisi/FETCH_MEKSPEDISI',
  CREATE_MEKSPEDISI: 'mEkspedisi/CREATE_MEKSPEDISI',
  UPDATE_MEKSPEDISI: 'mEkspedisi/UPDATE_MEKSPEDISI',
  DELETE_MEKSPEDISI: 'mEkspedisi/DELETE_MEKSPEDISI',
  SET_BLOB: 'mEkspedisi/SET_BLOB',
  RESET: 'mEkspedisi/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMEkspedisi>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MEkspedisiState = Readonly<typeof initialState>;

// Reducer

export default (state: MEkspedisiState = initialState, action): MEkspedisiState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEKSPEDISI_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEKSPEDISI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEKSPEDISI):
    case REQUEST(ACTION_TYPES.UPDATE_MEKSPEDISI):
    case REQUEST(ACTION_TYPES.DELETE_MEKSPEDISI):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEKSPEDISI_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEKSPEDISI):
    case FAILURE(ACTION_TYPES.CREATE_MEKSPEDISI):
    case FAILURE(ACTION_TYPES.UPDATE_MEKSPEDISI):
    case FAILURE(ACTION_TYPES.DELETE_MEKSPEDISI):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEKSPEDISI_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEKSPEDISI):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEKSPEDISI):
    case SUCCESS(ACTION_TYPES.UPDATE_MEKSPEDISI):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEKSPEDISI):
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

const apiUrl = 'api/m-ekspedisis';

// Actions

export const getEntities: ICrudGetAllAction<IMEkspedisi> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MEKSPEDISI_LIST,
    payload: axios.get<IMEkspedisi>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMEkspedisi> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEKSPEDISI,
    payload: axios.get<IMEkspedisi>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMEkspedisi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEKSPEDISI,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMEkspedisi> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEKSPEDISI,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMEkspedisi> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEKSPEDISI,
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
