import React, { useCallback, useState, useEffect } from 'react';
import { SearchResultType, SearchResultListType } from '../services/service';
import '../css/SearchResults.css';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../redux/reducer';

interface Props {
  onChangeSelectItemIndex: (index: number) => void
}

const SearchResults: React.FC<Props> = ({ onChangeSelectItemIndex }) => {
  const publicPath = process.env.PUBLIC_URL;

  const { searchCategoriedResults, searchResultsArray, selectedItemIndex }: {
    searchCategoriedResults: SearchResultListType,
    searchResultsArray: Array<SearchResultType>
    selectedItemIndex: number | null
  } = useSelector((state: IState) => state);

  const onClickListItem = (index: number): void => onChangeSelectItemIndex(index);


  return (
    <div className="spotlight-search-results">
      <div className="search-result-list">
        {
          Object.entries(searchCategoriedResults).map(([key, value]) => (
            <section key={key}>
              <h4>{key}</h4>
              {value.map(({ icon, name, indexInArray }: SearchResultType) => {
                const isSelected = selectedItemIndex != null && indexInArray === selectedItemIndex;
                return <div key={indexInArray} className={`search-result-list-item${isSelected ? ' selected' : ''}`}
                  onClick={() => onClickListItem(indexInArray ?? 0)}>
                  <img alt="" className="search-result-list-item-icon" src={`${publicPath}/icons/${icon}`} />
                  <span>{name}</span>
                </div>;
              }
              )}
            </section>))
        }

      </div>
      <div className="search-result-detail">
        {
          selectedItemIndex != null && searchResultsArray[selectedItemIndex] &&
          <>
            <img alt=""
              className="search-result-detail-icon"
              src={`${publicPath}/icons/${searchResultsArray[selectedItemIndex].icon}`} />
            <span>{searchResultsArray[selectedItemIndex].name}</span>
          </>
        }
      </div>
    </div>
  );
}

export default SearchResults;