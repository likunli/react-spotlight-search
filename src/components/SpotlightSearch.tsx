import React, { useState, useCallback, useEffect, useRef } from 'react';
import '../css/SpotlightSearch.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { SearchResultListType, handleSearch, SearchResultType } from '../services/service';
import SearchResults from './SearchResults';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchResults, setSelectedItemIndex } from '../redux/actions';
import { IState } from '../redux/reducer';

const SpotlightSearch: React.FC = () => {

  const [inputText, setInputText] = useState<string>('');

  const dispatch = useDispatch();

  const { searchCategoriedResults, searchResultsArray, selectedItemIndex }: {
    searchCategoriedResults: SearchResultListType,
    searchResultsArray: Array<SearchResultType>
    selectedItemIndex: number | null
  } = useSelector((state: IState) => state);

  const publicPath = process.env.PUBLIC_URL;

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     console.log(count);
  //     if (count > 0) {
  //       setCount(count - 1);
  //     } else if (count == 0) {
  //       setInputText('');
  //       setSelectedItemIndex(null);
  //       setSearchResults([]);
  //     }
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [count]);



  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
      }
      if (e.key === 'ArrowUp' && selectedItemIndex != null && selectedItemIndex - 1 >= 0) {
        dispatch(setSelectedItemIndex(selectedItemIndex - 1));
        
      } else if (e.key === 'ArrowDown' && selectedItemIndex != null && selectedItemIndex + 1 < searchResultsArray.length) {
        dispatch(setSelectedItemIndex(selectedItemIndex + 1));
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [dispatch, selectedItemIndex, searchResultsArray.length]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    setInputText(value);
    const results = handleSearch(value);
    dispatch(setSearchResults(results));
  }

  const onChangeSelectItemIndex = (index: number) => {
    if (searchResultsArray[index] != null) {
      dispatch(setSelectedItemIndex(index));
    }
  }

  return (
    <div className="spotlight">
      <div className="spotlight-search-bar">
        <div className="search-icon">
          <AiOutlineSearch size="2.5rem" />
        </div>
        <input placeholder="Spotlight Search" value={inputText} onChange={handleChange} />
        {/* {count != 0 && <span>{count}</span>} */}
        {
          selectedItemIndex != null && searchResultsArray[selectedItemIndex] != null &&
          <img alt="" className="search-bar-selected-item-icon" src={`${publicPath}/icons/${searchResultsArray[selectedItemIndex].icon}`} />
        }
      </div>
      {searchResultsArray.length > 0 && <SearchResults onChangeSelectItemIndex={onChangeSelectItemIndex} />}
    </div>
  )
};

export default SpotlightSearch;