import React, { useState, useReducer, useRef, useEffect } from 'react';
import { userService } from '../../services/userService';
import { useDispatch } from 'react-redux';
import { loginAction, hideAuthModalAction } from '../../redux/actions';

interface Props {
  showRegisterPanel: () => void
}

type LoginForm = {
  username: string | null,
  password: string | null,
}

const LoginPanel: React.FC<Props> = (props: Props) => {

  const { showRegisterPanel } = props;

  const dispath = useDispatch();

  const usernameTextboxRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState<LoginForm>({ username: null, password: null });

  useEffect(() => {
    if (usernameTextboxRef && usernameTextboxRef.current) {
      usernameTextboxRef.current.focus();
    }
  }, [props]);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setLoginForm({ ...loginForm, username: e.target.value });

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setLoginForm({ ...loginForm, password: e.target.value });

  const handleLogin = async () => {
    if (!loginForm.username) {
      setError('Username is required.');
      return;
    }
    if (!loginForm.password) {
      setError('Password is required.');
      return;
    }
    setError('');
    try {
      const response = await userService.login({
        username: loginForm.username,
        password: loginForm.password
      });
      dispath(loginAction(loginForm.username));
      dispath(hideAuthModalAction());
    } catch (err) {
      setLoginForm({ ...loginForm, password: '' });
      setError(err.message || 'unknown error.');
    }
  }

  return (
    <div className="panel">
      <h1 className="title">Login</h1>
      <p className="error">{error}</p>
      <form className="login-form">
        <input className="text-box, username"
          onChange={onUsernameChange}
          placeholder="Username"
          ref={usernameTextboxRef}
          value={loginForm?.username || ''}
        />
        <input className="text-box password"
          onChange={onPasswordChange}
          placeholder="Password"
          type="password"
          value={loginForm?.password || ''}
        />
        <button className="btn login-btn" onClick={handleLogin}>Login</button>
        <div className="prompt-box">
          Don't have an acccount?
          <span className="clickable create-acc"
            onClick={showRegisterPanel}>Create Account</span>
        </div>
      </form>
    </div>
  );
}

export default LoginPanel;