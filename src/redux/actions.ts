import { SearchResultListType, SearchResultType } from "../services/service";
import { ActionType } from "./ActionType";


export const setSearchResults = (results: SearchResultListType) => {
  const resultsInArray: Array<SearchResultType> = [];
  for (const value of Object.values(results)) {
    resultsInArray.push(...value);
  }
  
  return {
    type: ActionType.SET_SEARCH_RESULTS,
    results,
    resultsInArray
  };
};

export const setSelectedItemIndex = (index: number) => ({
  type: ActionType.SET_SELECTED_ITEM_INDEX,
  index
});

