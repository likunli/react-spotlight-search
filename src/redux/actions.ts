
import { ActionTypes } from '../constants/ActionTypes';
import { AppTheme } from '../constants/AppTheme';

export interface IChangeThemeAction {
  theme: AppTheme,
  type: ActionTypes
}


export const changeThemeAction = (theme: AppTheme): IChangeThemeAction => ({
  theme,
  type: ActionTypes.CHANGE_THEME
});

export const showAuthModalAction = () => ({ type: ActionTypes.SHOW_AUTH_MODAL });

export const hideAuthModalAction = () => ({ type: ActionTypes.HIDE_AUTH_MODAL });

export const loginAction = (username: string) => ({
  type: ActionTypes.LOGIN,
  username
});

export const logoutAction = () => ({ type: ActionTypes.LOGOUT });