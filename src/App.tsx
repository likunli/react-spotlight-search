import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { AppTheme } from './constants/AppTheme';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { IState } from './redux/reducer';
import HomePageView from './components/HomePageView';
import ThreadListView from './components/ThreadListView';
import ThreadDetailView from './components/thread/ThreadDetailView';
import './css/App.css';
import AuthModal from './components/common/AuthModal';
import { userService } from './services/userService';
import { loginAction, logoutAction } from './redux/actions';

interface Props { }

const App: React.FC<Props> = () => {

  const dispatch = useDispatch();

  useEffect(() => { checkLoginStatus() }, []);

  const checkLoginStatus = async (): Promise<void> => {
    try {
      const response = await userService.checkSession();
      console.log(response);
      const {username} = response.data;
      dispatch(loginAction(username));
    } catch (e) {
      dispatch(logoutAction());
    }
  }

  return (
    <div className="App">
      <Header />
      <section className="container">
        <Route path="/" exact component={HomePageView} />
        <Route path="/threads" exact component={ThreadListView} />
        <Route path="/thread/:id" exact component={ThreadDetailView} />
      </section>
      <Footer />
      <AuthModal />
    </div>
  );
}

export default App;
