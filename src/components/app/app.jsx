import React, { useEffect, useState, useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import StartPage from '../../pages/start-page';
import PostPage from '../../pages/post-page';
import RegistrationPage from '../../pages/registration-page';
import LoginPage from '../../pages/login-page';
import ProfileEditPage from '../../pages/profile-edit-page';
import NewArticlePage from '../../pages/new-article-page';
import EditArticlePage from '../../pages/edit-article-page';
import Header from '../header';
import ApiService from '../../services/api-service';

function App() {
  const apiService = useMemo(() => new ApiService(), []);
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      apiService.getCurrentUser(token).then(setUser);
    }
  }, [apiService]);

  const onLogin = (token) => {
    apiService.getCurrentUser(token).then(setUser);
  };

  const onLogOut = () => setUser({});

  const autoLogin = (userInfo) => {
    apiService.loginUser(userInfo).then((data) => {
      setUser(data.result.user);
      localStorage.setItem('token', data.result.user.token);
    });
  };

  return (
    <div>
      <Header authToken={user.token} setAuthToken={onLogOut} />
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<StartPage />} />
        <Route path="/articles/:slug" element={<PostPage token={user.token} username={user.username} />} />
        <Route path="/articles/:slug/edit" element={<EditArticlePage token={user.token} />} />
        <Route path="/new-article" element={<NewArticlePage token={user.token} />} />
        <Route path="/sign-in" element={<LoginPage token={user.token} setAuthToken={onLogin} />} />
        <Route path="/sign-up" element={<RegistrationPage token={user.token} autoLogin={autoLogin} />} />
        <Route path="/profile" element={<ProfileEditPage token={user.token} setAuthToken={onLogin} />} />
      </Routes>
    </div>
  );
}

export default App;
