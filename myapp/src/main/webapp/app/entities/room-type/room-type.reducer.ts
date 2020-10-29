import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IRoomType, defaultValue } from 'app/shared/model/room-type.model';

export const ACTION_TYPES = {
  FETCH_ROOMTYPE_LIST: 'roomType/FETCH_ROOMTYPE_LIST',
  FETCH_ROOMTYPE: 'roomType/FETCH_ROOMTYPE',
  CREATE_ROOMTYPE: 'roomType/CREATE_ROOMTYPE',
  UPDATE_ROOMTYPE: 'roomType/UPDATE_ROOMTYPE',
  DELETE_ROOMTYPE: 'roomType/DELETE_ROOMTYPE',
  RESET: 'roomType/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IRoomType>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type RoomTypeState = Readonly<typeof initialState>;

// Reducer

export default (state: RoomTypeState = initialState, action): RoomTypeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ROOMTYPE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ROOMTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_ROOMTYPE):
    case REQUEST(ACTION_TYPES.UPDATE_ROOMTYPE):
    case REQUEST(ACTION_TYPES.DELETE_ROOMTYPE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ROOMTYPE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ROOMTYPE):
    case FAILURE(ACTION_TYPES.CREATE_ROOMTYPE):
    case FAILURE(ACTION_TYPES.UPDATE_ROOMTYPE):
    case FAILURE(ACTION_TYPES.DELETE_ROOMTYPE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROOMTYPE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ROOMTYPE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_ROOMTYPE):
    case SUCCESS(ACTION_TYPES.UPDATE_ROOMTYPE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ROOMTYPE):
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

const apiUrl = 'api/room-types';

// Actions

export const getEntities: ICrudGetAllAction<IRoomType> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ROOMTYPE_LIST,
  payload: axios.get<IRoomType>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IRoomType> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ROOMTYPE,
    payload: axios.get<IRoomType>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IRoomType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ROOMTYPE,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IRoomType> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ROOMTYPE,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IRoomType> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ROOMTYPE,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
