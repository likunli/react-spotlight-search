import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userService } from '../../services/userService';
import { loginAction, hideAuthModalAction } from '../../redux/actions';

interface Props {
  showLoginPanel: () => void
}

type RegisterForm = {
  username: string | null,
  password: string | null,
  confirmPassword: string | null,
}

const RegisterPanel: React.FC<Props> = ({ showLoginPanel }: Props) => {

  const dispatch = useDispatch();

  const usernameTextboxRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState<string | null>(null);

  const [registerForm, setRegisterForm] = useState<RegisterForm>({ username: null, password: null, confirmPassword: null });

  useEffect(() => {
    if (usernameTextboxRef && usernameTextboxRef.current) {
      usernameTextboxRef.current.focus();
    }
  }, [])

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setRegisterForm({ ...registerForm, username: e.target.value });

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setRegisterForm({ ...registerForm, password: e.target.value });

  const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    setRegisterForm({ ...registerForm, confirmPassword: e.target.value });

  const handleRegister = async () => {
    if (!registerForm.username) {
      setError('Username is required.');
      return;
    }
    if (!registerForm.password) {
      setError('Password is required.');
      return;
    }
    if (!registerForm.confirmPassword) {
      setError('Please Confirm Password.');
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Please confirm password correctly.');
      return;
    }
    setError('');
    try {
      await userService.create({
        username: registerForm.username,
        password: registerForm.password
      });
      await userService.login({
        username: registerForm.username,
        password: registerForm.password
      })
      dispatch(loginAction(registerForm.username));
      dispatch(hideAuthModalAction());
      setRegisterForm({ username: '', password: '', confirmPassword: '' });
    } catch (err) {
      setRegisterForm({ ...registerForm, password: '' });
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
          value={registerForm?.username || ''}
        />
        <input className="text-box password"
          onChange={onPasswordChange}
          placeholder="Password"
          type="password"
          value={registerForm?.password || ''}
        />
        <input className="text-box password"
          onChange={onConfirmPasswordChange}
          placeholder="Confirm Password"
          type="password"
          value={registerForm?.confirmPassword || ''}
        />
        <button className="btn login-btn"
          onClick={handleRegister}>Submit</button>
        <div className="prompt-box">
          Already have an account?
          <span className="clickable login-acc"
            onClick={showLoginPanel}>Log In</span>
        </div>
      </form>
    </div>
  );
}

export default RegisterPanel;