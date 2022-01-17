import React, { useEffect, useState, useMemo } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import StartPage from '../../pages/start-page';
import PostPage from '../../pages/post-page';
import RegistrationPage from '../../pages/registration-page';
import LoginPage from '../../pages/login-page';
import ProfileEditPage from '../../pages/profile-edit-page';
import NewArticlePage from '../../pages/new-article-page';
import EditArticlePage from '../../pages/edit-article-page';
import NotFoundPage from '../../pages/not-found-page';
import Header from '../header';
import ApiService from '../../services/api-service';
import { ApiServiceContext, UserContext } from '../../context';
import LoadSpinner from '../load-spinner';

function App() {
  const apiService = useMemo(() => new ApiService(), []);
  const [user, setUser] = useState({});
  const [checkSaveUser, setCheckSaveUser] = useState(true);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) setUser(JSON.parse(currentUser));
    setCheckSaveUser(false);
  }, [apiService]);

  const onLogin = (token) => {
    apiService.getCurrentUser(token).then((user) => {
      setUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  };

  const onLogOut = () => {
    setUser({});
    localStorage.removeItem('currentUser');
  };

  const autoLogin = (userInfo) => {
    apiService.loginUser(userInfo).then((data) => {
      setUser(data.result.user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    });
  };

  if (checkSaveUser) return <LoadSpinner />;

  return (
    <UserContext.Provider value={user}>
      <ApiServiceContext.Provider value={apiService}>
        <div>
          <Header onLogOut={onLogOut} />
          <Routes>
            <Route path="/" element={<Navigate to="/articles" replace />} />
            <Route path="/articles" element={<StartPage />} />
            <Route path="/articles/:slug" element={<PostPage />} />
            <Route path="/articles/:slug/edit" element={<EditArticlePage />} />
            <Route path="/new-article" element={<NewArticlePage />} />
            <Route path="/sign-in" element={<LoginPage onLogin={onLogin} />} />
            <Route path="/sign-up" element={<RegistrationPage autoLogin={autoLogin} />} />
            <Route path="/profile" element={<ProfileEditPage updateInfo={onLogin} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </ApiServiceContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
