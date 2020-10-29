import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IPrintInfo, defaultValue } from 'app/shared/model/print-info.model';

export const ACTION_TYPES = {
  FETCH_PRINTINFO_LIST: 'printInfo/FETCH_PRINTINFO_LIST',
  FETCH_PRINTINFO: 'printInfo/FETCH_PRINTINFO',
  CREATE_PRINTINFO: 'printInfo/CREATE_PRINTINFO',
  UPDATE_PRINTINFO: 'printInfo/UPDATE_PRINTINFO',
  DELETE_PRINTINFO: 'printInfo/DELETE_PRINTINFO',
  RESET: 'printInfo/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IPrintInfo>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type PrintInfoState = Readonly<typeof initialState>;

// Reducer

export default (state: PrintInfoState = initialState, action): PrintInfoState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_PRINTINFO_LIST):
    case REQUEST(ACTION_TYPES.FETCH_PRINTINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PRINTINFO):
    case REQUEST(ACTION_TYPES.UPDATE_PRINTINFO):
    case REQUEST(ACTION_TYPES.DELETE_PRINTINFO):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_PRINTINFO_LIST):
    case FAILURE(ACTION_TYPES.FETCH_PRINTINFO):
    case FAILURE(ACTION_TYPES.CREATE_PRINTINFO):
    case FAILURE(ACTION_TYPES.UPDATE_PRINTINFO):
    case FAILURE(ACTION_TYPES.DELETE_PRINTINFO):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRINTINFO_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PRINTINFO):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PRINTINFO):
    case SUCCESS(ACTION_TYPES.UPDATE_PRINTINFO):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_PRINTINFO):
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

const apiUrl = 'api/print-infos';

// Actions

export const getEntities: ICrudGetAllAction<IPrintInfo> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_PRINTINFO_LIST,
  payload: axios.get<IPrintInfo>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IPrintInfo> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PRINTINFO,
    payload: axios.get<IPrintInfo>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IPrintInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PRINTINFO,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IPrintInfo> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PRINTINFO,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IPrintInfo> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_PRINTINFO,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
