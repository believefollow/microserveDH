import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStorage, defaultValue } from 'app/shared/model/storage.model';

export const ACTION_TYPES = {
  FETCH_STORAGE_LIST: 'storage/FETCH_STORAGE_LIST',
  FETCH_STORAGE: 'storage/FETCH_STORAGE',
  CREATE_STORAGE: 'storage/CREATE_STORAGE',
  UPDATE_STORAGE: 'storage/UPDATE_STORAGE',
  DELETE_STORAGE: 'storage/DELETE_STORAGE',
  RESET: 'storage/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStorage>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type StorageState = Readonly<typeof initialState>;

// Reducer

export default (state: StorageState = initialState, action): StorageState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STORAGE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STORAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_STORAGE):
    case REQUEST(ACTION_TYPES.UPDATE_STORAGE):
    case REQUEST(ACTION_TYPES.DELETE_STORAGE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_STORAGE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STORAGE):
    case FAILURE(ACTION_TYPES.CREATE_STORAGE):
    case FAILURE(ACTION_TYPES.UPDATE_STORAGE):
    case FAILURE(ACTION_TYPES.DELETE_STORAGE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORAGE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_STORAGE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_STORAGE):
    case SUCCESS(ACTION_TYPES.UPDATE_STORAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_STORAGE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/storages';

// Actions

export const getEntities: ICrudGetAllAction<IStorage> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STORAGE_LIST,
  payload: axios.get<IStorage>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IStorage> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STORAGE,
    payload: axios.get<IStorage>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IStorage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STORAGE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStorage> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STORAGE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStorage> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STORAGE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
