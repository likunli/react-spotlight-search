import React from 'react';
import './App.css';
import SpotlightSearch from './components/SpotlightSearch';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <SpotlightSearch />
      </Provider>
    </div>
  );
}

export default App;
