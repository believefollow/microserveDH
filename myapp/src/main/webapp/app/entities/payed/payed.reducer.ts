import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPayed, defaultValue } from 'app/shared/model/payed.model';

export const ACTION_TYPES = {
  FETCH_PAYED_LIST: 'payed/FETCH_PAYED_LIST',
  FETCH_PAYED: 'payed/FETCH_PAYED',
  CREATE_PAYED: 'payed/CREATE_PAYED',
  UPDATE_PAYED: 'payed/UPDATE_PAYED',
  DELETE_PAYED: 'payed/DELETE_PAYED',
  RESET: 'payed/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPayed>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PayedState = Readonly<typeof initialState>;

// Reducer

export default (state: PayedState = initialState, action): PayedState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PAYED_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PAYED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYED):
    case REQUEST(ACTION_TYPES.UPDATE_PAYED):
    case REQUEST(ACTION_TYPES.DELETE_PAYED):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PAYED_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PAYED):
    case FAILURE(ACTION_TYPES.CREATE_PAYED):
    case FAILURE(ACTION_TYPES.UPDATE_PAYED):
    case FAILURE(ACTION_TYPES.DELETE_PAYED):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYED_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYED):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYED):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYED):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PAYED):
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

const apiUrl = 'api/payeds';

// Actions

export const getEntities: ICrudGetAllAction<IPayed> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PAYED_LIST,
  payload: axios.get<IPayed>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPayed> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYED,
    payload: axios.get<IPayed>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPayed> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYED,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPayed> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYED,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPayed> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PAYED,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
