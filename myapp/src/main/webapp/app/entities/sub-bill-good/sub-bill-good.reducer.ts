import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ISubBillGood, defaultValue } from 'app/shared/model/sub-bill-good.model';

export const ACTION_TYPES = {
  FETCH_SUBBILLGOOD_LIST: 'subBillGood/FETCH_SUBBILLGOOD_LIST',
  FETCH_SUBBILLGOOD: 'subBillGood/FETCH_SUBBILLGOOD',
  CREATE_SUBBILLGOOD: 'subBillGood/CREATE_SUBBILLGOOD',
  UPDATE_SUBBILLGOOD: 'subBillGood/UPDATE_SUBBILLGOOD',
  DELETE_SUBBILLGOOD: 'subBillGood/DELETE_SUBBILLGOOD',
  RESET: 'subBillGood/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ISubBillGood>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type SubBillGoodState = Readonly<typeof initialState>;

// Reducer

export default (state: SubBillGoodState = initialState, action): SubBillGoodState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_SUBBILLGOOD_LIST):
    case REQUEST(ACTION_TYPES.FETCH_SUBBILLGOOD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_SUBBILLGOOD):
    case REQUEST(ACTION_TYPES.UPDATE_SUBBILLGOOD):
    case REQUEST(ACTION_TYPES.DELETE_SUBBILLGOOD):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_SUBBILLGOOD_LIST):
    case FAILURE(ACTION_TYPES.FETCH_SUBBILLGOOD):
    case FAILURE(ACTION_TYPES.CREATE_SUBBILLGOOD):
    case FAILURE(ACTION_TYPES.UPDATE_SUBBILLGOOD):
    case FAILURE(ACTION_TYPES.DELETE_SUBBILLGOOD):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBBILLGOOD_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_SUBBILLGOOD):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_SUBBILLGOOD):
    case SUCCESS(ACTION_TYPES.UPDATE_SUBBILLGOOD):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_SUBBILLGOOD):
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

const apiUrl = 'api/sub-bill-goods';

// Actions

export const getEntities: ICrudGetAllAction<ISubBillGood> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_SUBBILLGOOD_LIST,
  payload: axios.get<ISubBillGood>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ISubBillGood> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_SUBBILLGOOD,
    payload: axios.get<ISubBillGood>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ISubBillGood> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_SUBBILLGOOD,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ISubBillGood> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_SUBBILLGOOD,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ISubBillGood> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_SUBBILLGOOD,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
