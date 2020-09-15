import { SearchResultListType, SearchResultType } from "../services/service";
import { ActionType } from "./ActionType";


export interface IState {
  searchCategoriedResults: SearchResultListType,
  searchResultsArray: Array<SearchResultType>,
  selectedItemIndex: number | null,
}

const initialState: IState = {
  searchCategoriedResults: {},
  searchResultsArray: [],
  selectedItemIndex: null
}

export const rootReducer = (state: IState = initialState, action: any) => {
  switch (action.type) {
    case ActionType.SET_SEARCH_RESULTS:
      return {
        ...state,
        searchCategoriedResults: action.results,
        searchResultsArray: action.resultsInArray,
        selectedItemIndex: action.resultsInArray.length > 0 ? 0 : null
      }
    case ActionType.SET_SELECTED_ITEM_INDEX:
      return {
        ...state,
        selectedItemIndex: action.index
      }
    default:
      return state;
  }
};
