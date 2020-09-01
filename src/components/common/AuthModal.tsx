import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IState } from '../../redux/reducer';
import { createPortal } from 'react-dom';
import { hideAuthModalAction } from '../../redux/actions';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';
import '../../css/AuthModal.css';

interface Props {

}

const AuthModal: React.FC = (props: Props) => {

  const dispatch = useDispatch();

  const shouldShowAuthModal = useSelector((state: IState): boolean => state.shouldShowAuthModal);

  const [shouldShowLoginPanel, setShouldShowLoginPanel] = useState<boolean>(true);

  const showLoginPanel = (): void => setShouldShowLoginPanel(true);

  const showRegisterPanel = (): void => setShouldShowLoginPanel(false);

  const hideAuthModal = () => dispatch(hideAuthModalAction());

  return createPortal(
    <div className="modal auth-modal"
      onClick={hideAuthModal}
      style={{ display: shouldShowAuthModal ? 'flex' : 'none' }}
    >
      <div className="modal-content"
        onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
          e.stopPropagation();
          e.nativeEvent.preventDefault();
        }}>
        <div className="auth-panel">
          <button type="button" className="close-btn"
            onClick={hideAuthModal}>&times;</button>
          {
            shouldShowLoginPanel ?
              <LoginPanel showRegisterPanel={showRegisterPanel} />
              :
              <RegisterPanel showLoginPanel={showLoginPanel} />
          }
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;