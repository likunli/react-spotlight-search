
import { ActionTypes } from '../constants/ActionTypes';
import { AppTheme } from '../constants/AppTheme';

export interface IChangeThemeAction {
  theme: AppTheme,
  type: ActionTypes
}

export const changeTheme = (theme: AppTheme): IChangeThemeAction => ({
  theme,
  type: ActionTypes.CHANGE_THEME
});