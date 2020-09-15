import data from '../mockData1.json';


export type SearchResultListType = {
  [key: string]: Array<SearchResultType>
};
// export type SearchResultListType = Array<SearchResultType>;

export type SearchResultType = {
  icon?: string,
  name: string,
  indexInArray?: number
}

export const handleSearch = (query: string) => {
  if (!query) {
    return {};
  }
  // console.log(query);
  // const res = Object.assign({}, ...Object.entries(data).map(([key, arr]) => ({
  //   [key]: arr.filter(({ name }: SearchResultType): boolean =>
  //     name.toLowerCase().includes(query.toLowerCase()))
  // })));
  const searchResults: SearchResultListType = {};
  let count = 0;
  for (let [category, arr] of Object.entries(data)) {
    const payload: Array<SearchResultType> = arr.filter(({ name }: SearchResultType): boolean =>
      name.toLowerCase().includes(query.toLowerCase()));

    if (payload.length > 0) {
      for (let item of payload) {
        item.indexInArray = count++;
      }
      searchResults[category] = payload;
    }
  }
  return searchResults;
};