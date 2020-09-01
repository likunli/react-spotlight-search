import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../redux/reducer';
import { Link } from 'react-router-dom';
import { MdQuestionAnswer } from 'react-icons/md';
import { AppTheme } from '../../constants/AppTheme';
import '../../css/Header.css';
import { changeThemeAction, IChangeThemeAction, showAuthModalAction, logoutAction } from '../../redux/actions';
import Modal from './Modal';
import { userService } from '../../services/userService';

interface Props {
}

const Header: React.FC<Props> = (props: Props) => {

  const dispatch = useDispatch();

  const { username, theme }
    : {
      username: string | null,
      theme: AppTheme
    }
    = useSelector((state: IState) => state);

  const [shouldShowNewThreadModal, setShouldShowNewThreadModal] = useState<boolean>(false);

  const [shouldShowLogoutModal, setShouldShowLogoutModal] = useState<boolean>(false);

  const onCreateNewThread = (): void => { }

  // const showNewThreadModal = (): void => setShouldShowNewThreadModal(true);

  // const hideNewThreadModal = (): void => setShouldShowNewThreadModal(false);

  const showLogoutModal = (): void => setShouldShowLogoutModal(true);

  const hideLogoutModal = (): void => setShouldShowLogoutModal(false);

  const onThemeChange = (): IChangeThemeAction =>
    dispatch(changeThemeAction(theme === AppTheme.DARK ? AppTheme.LIGHT : AppTheme.DARK));

  const showAuthModal = () => dispatch(showAuthModalAction());

  const handleLogout = async (): Promise<void> => {
    try {
      await userService.logout();
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(logoutAction());
      setShouldShowLogoutModal(false);
    }
  }


  return (
    <header className="header">
      <div className="nav">
        <Link to="/">
          <div className="nav-left clickable">
            Roommate Finder
          </div>
        </Link>
      </div>
      <div className="nav-right">
        <div className="create-thread clickable"
          onClick={onCreateNewThread}>
          <MdQuestionAnswer />Post
        </div>

        <div className="user-info">
          {username === null ?
            // is not logged in
            <div className="login clickable"
              onClick={showAuthModal}>Sign In</div>
            :
            <>
              Welcome,<span className="username clickable"
                onClick={showLogoutModal}>{username}</span>
              <Modal isOpen={shouldShowLogoutModal}
                message="Please Confirm to log out."
                onConfirm={handleLogout}
                onClose={hideLogoutModal} />
            </>
          }
        </div>
        <div className="theme">
          <label>Theme:</label>
          <select value={theme} onChange={onThemeChange}>
            {
              Object.values(AppTheme).map(theme => <option key={theme} value={theme}>{theme}</option>)
            }
          </select>
        </div>
      </div>
    </header>
  );
}

export default Header;