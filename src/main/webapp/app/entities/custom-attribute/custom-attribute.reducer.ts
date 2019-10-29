import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomAttribute, defaultValue } from 'app/shared/model/custom-attribute.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMATTRIBUTE_LIST: 'customAttribute/FETCH_CUSTOMATTRIBUTE_LIST',
  FETCH_CUSTOMATTRIBUTE: 'customAttribute/FETCH_CUSTOMATTRIBUTE',
  CREATE_CUSTOMATTRIBUTE: 'customAttribute/CREATE_CUSTOMATTRIBUTE',
  UPDATE_CUSTOMATTRIBUTE: 'customAttribute/UPDATE_CUSTOMATTRIBUTE',
  DELETE_CUSTOMATTRIBUTE: 'customAttribute/DELETE_CUSTOMATTRIBUTE',
  RESET: 'customAttribute/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomAttribute>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CustomAttributeState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomAttributeState = initialState, action): CustomAttributeState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMATTRIBUTE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMATTRIBUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMATTRIBUTE):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMATTRIBUTE):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMATTRIBUTE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMATTRIBUTE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMATTRIBUTE):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMATTRIBUTE):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMATTRIBUTE):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMATTRIBUTE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMATTRIBUTE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMATTRIBUTE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMATTRIBUTE):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMATTRIBUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMATTRIBUTE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/custom-attributes';

// Actions

export const getEntities: ICrudGetAllAction<ICustomAttribute> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTOMATTRIBUTE_LIST,
  payload: axios.get<ICustomAttribute>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICustomAttribute> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMATTRIBUTE,
    payload: axios.get<ICustomAttribute>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustomAttribute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMATTRIBUTE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomAttribute> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMATTRIBUTE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomAttribute> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMATTRIBUTE,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
