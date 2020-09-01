import { AppTheme } from '../constants/AppTheme';
import { ActionTypes } from '../constants/ActionTypes';

export interface IState {
  loading: boolean,
  username: string | null,
  shouldShowErrorModal: boolean,
  shouldShowAuthModal: boolean,
  theme: AppTheme,
}

const initialState: IState = {
  loading: false,
  username: null,
  shouldShowErrorModal: false,
  shouldShowAuthModal: false,
  theme: AppTheme.LIGHT
}

const rootReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case ActionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      }
    case ActionTypes.SHOW_AUTH_MODAL:
      return {
        ...state,
        shouldShowAuthModal: true
      }
    case ActionTypes.HIDE_AUTH_MODAL:
      return {
        ...state,
        shouldShowAuthModal: false
      }
    case ActionTypes.LOGIN:
      return {
        ...state,
        username: action.username
      }
    case ActionTypes.LOGOUT:
      return {
        ...state,
        username: null
      }
    default:
      return state;
  }
}

export default rootReducer;