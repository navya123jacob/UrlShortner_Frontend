import React from 'react';
import { Provider, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { store } from './Store/store';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import { PrivateRoute, PublicRoute } from './Authentication';
import { RootState } from './Store/store';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);


  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Route>
          <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
