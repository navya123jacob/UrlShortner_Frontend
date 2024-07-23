import React, { useState } from 'react';
import { useLoginMutation } from '../Store/apiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../Store/authSlice';
import './SignupPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [login] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };
  const handleLogin = async () => {
    try {
      setEmailError('');
    setPasswordError('');
    


    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }

      const response = await login({ email, password }).unwrap();
      if ('error' in response) {
        setErrorMessage(response.error.data?.message || 'Failed to login');
      } else {
        dispatch(loginAction({ token: response.token, user: response.user }));
        navigate('/');
      }
    } catch (error: any) {
      setErrorMessage(error.data?.message || 'Failed to login');
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <img src="/image-1.png" alt="" className="image-1" />
        <h1 className="title">URL Shortener</h1>
        <form>
          <h3>Login</h3>
          <div className="form-holder">
            <span className="lnr lnr-envelope"></span>
            <input
              type="email"
              className="form-control"
              placeholder="Mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <div className="error-message">{emailError}</div>}
          </div>
          <div className="form-holder">
            <span className="lnr lnr-lock"></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {passwordError && <div className="error-message">{passwordError}</div>}
          </div>
          <button type="button" onClick={handleLogin}>
            <span>Login</span>
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <Link to='/signup'>Signup</Link>
        </form>
        <img src="/image-2.png" alt="" className="image-2" />
      </div>
    </div>
  );
};

export default LoginPage;
