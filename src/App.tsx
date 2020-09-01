import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTheme } from './redux/actions';
import { Route } from 'react-router-dom';
import { AppTheme } from './constants/AppTheme';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { IState } from './redux/reducer';
import HomePageView from './components/HomePageView';
import ThreadListView from './components/ThreadListView';
import ThreadDetailView from './components/thread/ThreadDetailView';
import './css/App.css';

interface Props { }

const App: React.FC<Props> = () => {

  const dispatch = useDispatch();

  const theme = useSelector((state: IState): AppTheme => state.theme);

  // const onClick = (): void => {
  //   dispatch(changeTheme(currentTheme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK));
  // }

  return (
    <div className="App">
      <Header />
      <section className="container">
        <Route path="/" exact component={HomePageView} />
        <Route path="/threads" exact component={ThreadListView} />
        <Route path="/thread/:id" exact component={ThreadDetailView} />
      </section>
      <Footer />
    </div>
  );
}

export default App;
