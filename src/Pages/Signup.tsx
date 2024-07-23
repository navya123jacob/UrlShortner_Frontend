import React, { useState } from 'react';
import { useSignupMutation } from '../Store/apiSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login as loginAction } from '../Store/authSlice';
import './SignupPage.css';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return re.test(password);
  };

  const handleSignup = async () => {
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setSignupError('');

    if (!name) {
      setNameError('Name is required');
      return;
    }

    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters, include one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&)');
      return;
    }

    try {
      const response = await signup({ name, email, password }).unwrap();

      if ('error' in response) {
        setSignupError(response.error.data?.message || 'Failed to signup');
      } else {
        dispatch(loginAction({ token: response.token, user: response.user }));
        navigate('/');
      }
    } catch (error: any) {
      setSignupError(error.data?.message || 'Failed to signup');
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <img src="/image-1.png" alt="" className="image-1" />
        <h1 className="title">URL Shortener</h1>
        <form>
          <h3>New Account?</h3>
          <div className="form-holder">
            <span className="lnr lnr-user"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <div className="error-message">{nameError}</div>}
          </div>
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
          <button type="button" onClick={handleSignup}>
            <span>Register</span>
          </button>
          {signupError && <div className="error-message">{signupError}</div>}
          <Link to="/login" className="login-link">Login if you already have an account</Link>
        </form>
        <img src="/image-2.png" alt="" className="image-2" />
      </div>
    </div>
  );
};

export default SignupPage;
