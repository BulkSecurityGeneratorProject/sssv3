import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMMaterial, defaultValue } from 'app/shared/model/m-material.model';

export const ACTION_TYPES = {
  FETCH_MMATERIAL_LIST: 'mMaterial/FETCH_MMATERIAL_LIST',
  FETCH_MMATERIAL: 'mMaterial/FETCH_MMATERIAL',
  CREATE_MMATERIAL: 'mMaterial/CREATE_MMATERIAL',
  UPDATE_MMATERIAL: 'mMaterial/UPDATE_MMATERIAL',
  DELETE_MMATERIAL: 'mMaterial/DELETE_MMATERIAL',
  SET_BLOB: 'mMaterial/SET_BLOB',
  RESET: 'mMaterial/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMMaterial>,
  entity: defaultValue,
  updating: false,
  totalItems: 0,
  updateSuccess: false
};

export type MMaterialState = Readonly<typeof initialState>;

// Reducer

export default (state: MMaterialState = initialState, action): MMaterialState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MMATERIAL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MMATERIAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MMATERIAL):
    case REQUEST(ACTION_TYPES.UPDATE_MMATERIAL):
    case REQUEST(ACTION_TYPES.DELETE_MMATERIAL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MMATERIAL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MMATERIAL):
    case FAILURE(ACTION_TYPES.CREATE_MMATERIAL):
    case FAILURE(ACTION_TYPES.UPDATE_MMATERIAL):
    case FAILURE(ACTION_TYPES.DELETE_MMATERIAL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MMATERIAL_LIST):
      return {
        ...state,
        loading: false,
        totalItems: action.payload.headers['x-total-count'],
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MMATERIAL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MMATERIAL):
    case SUCCESS(ACTION_TYPES.UPDATE_MMATERIAL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MMATERIAL):
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

const apiUrl = 'api/m-materials';

// Actions

export const getEntities: ICrudGetAllAction<IMMaterial> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_MMATERIAL_LIST,
    payload: axios.get<IMMaterial>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`)
  };
};

export const getEntity: ICrudGetAction<IMMaterial> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MMATERIAL,
    payload: axios.get<IMMaterial>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMMaterial> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MMATERIAL,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMMaterial> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MMATERIAL,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMMaterial> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MMATERIAL,
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