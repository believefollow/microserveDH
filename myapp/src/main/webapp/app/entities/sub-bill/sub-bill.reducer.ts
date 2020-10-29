import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISubBill, defaultValue } from 'app/shared/model/sub-bill.model';

export const ACTION_TYPES = {
  FETCH_SUBBILL_LIST: 'subBill/FETCH_SUBBILL_LIST',
  FETCH_SUBBILL: 'subBill/FETCH_SUBBILL',
  CREATE_SUBBILL: 'subBill/CREATE_SUBBILL',
  UPDATE_SUBBILL: 'subBill/UPDATE_SUBBILL',
  DELETE_SUBBILL: 'subBill/DELETE_SUBBILL',
  RESET: 'subBill/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISubBill>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SubBillState = Readonly<typeof initialState>;

// Reducer

export default (state: SubBillState = initialState, action): SubBillState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUBBILL_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUBBILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SUBBILL):
    case REQUEST(ACTION_TYPES.UPDATE_SUBBILL):
    case REQUEST(ACTION_TYPES.DELETE_SUBBILL):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SUBBILL_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUBBILL):
    case FAILURE(ACTION_TYPES.CREATE_SUBBILL):
    case FAILURE(ACTION_TYPES.UPDATE_SUBBILL):
    case FAILURE(ACTION_TYPES.DELETE_SUBBILL):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBBILL_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBBILL):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUBBILL):
    case SUCCESS(ACTION_TYPES.UPDATE_SUBBILL):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUBBILL):
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

const apiUrl = 'api/sub-bills';

// Actions

export const getEntities: ICrudGetAllAction<ISubBill> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUBBILL_LIST,
  payload: axios.get<ISubBill>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISubBill> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUBBILL,
    payload: axios.get<ISubBill>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISubBill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUBBILL,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISubBill> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUBBILL,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISubBill> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUBBILL,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
