import { AppTheme } from '../constants/AppTheme';
import { ActionTypes } from '../constants/ActionTypes';

export interface IState {
  loading: boolean,
  username: string | null,
  showErrorModal: boolean,
  showLoginModal: boolean,
  showPostThreadModal: boolean,
  theme: AppTheme,
}

const initialState: IState = {
  loading: false,
  username: null,
  showErrorModal: false,
  showLoginModal: false,
  showPostThreadModal: false,
  theme: AppTheme.LIGHT
}

const rootReducer = (state: IState = initialState, action: any): IState => {
  switch (action.type) {
    case ActionTypes.CHANGE_THEME:
      return {
        ...state,
        theme: action.theme
      }
    default:
      return state;
  }
}

export default rootReducer;