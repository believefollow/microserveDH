import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IReceipt, defaultValue } from 'app/shared/model/receipt.model';

export const ACTION_TYPES = {
  FETCH_RECEIPT_LIST: 'receipt/FETCH_RECEIPT_LIST',
  FETCH_RECEIPT: 'receipt/FETCH_RECEIPT',
  CREATE_RECEIPT: 'receipt/CREATE_RECEIPT',
  UPDATE_RECEIPT: 'receipt/UPDATE_RECEIPT',
  DELETE_RECEIPT: 'receipt/DELETE_RECEIPT',
  RESET: 'receipt/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IReceipt>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ReceiptState = Readonly<typeof initialState>;

// Reducer

export default (state: ReceiptState = initialState, action): ReceiptState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_RECEIPT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_RECEIPT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_RECEIPT):
    case REQUEST(ACTION_TYPES.UPDATE_RECEIPT):
    case REQUEST(ACTION_TYPES.DELETE_RECEIPT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_RECEIPT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_RECEIPT):
    case FAILURE(ACTION_TYPES.CREATE_RECEIPT):
    case FAILURE(ACTION_TYPES.UPDATE_RECEIPT):
    case FAILURE(ACTION_TYPES.DELETE_RECEIPT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECEIPT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_RECEIPT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_RECEIPT):
    case SUCCESS(ACTION_TYPES.UPDATE_RECEIPT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_RECEIPT):
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

const apiUrl = 'api/receipts';

// Actions

export const getEntities: ICrudGetAllAction<IReceipt> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_RECEIPT_LIST,
  payload: axios.get<IReceipt>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IReceipt> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_RECEIPT,
    payload: axios.get<IReceipt>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IReceipt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_RECEIPT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IReceipt> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_RECEIPT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IReceipt> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_RECEIPT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
