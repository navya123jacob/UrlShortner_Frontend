import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UrlForm from '../Components/UrlForm';
import UrlList from '../Components/UrlList';
import { logout } from '../Store/authSlice';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [change,setChange]=useState(0)

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(logout());
    navigate('/login');
  };

  

  return (
    <div className="wrapper">
      <div className="inner">
      <img src="/anya.png" alt="" className="image-3" />
        <h1 className="title">URL Shortener</h1>
        <UrlForm setChange={setChange}/>
        { <UrlList change={change}  /> }
        <img src="/image-2.png" alt="" className="image-4" />
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default HomePage;
