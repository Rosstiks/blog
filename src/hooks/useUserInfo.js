import { useState, useEffect, useMemo } from 'react';
import ApiService from '../services/api-service';

export default function useUserInfo(authToken) {
  const apiService = useMemo(() => new ApiService(), []);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (authToken) {
      apiService.getCurrentUser(authToken).then(setUser);
    }
  }, [authToken, apiService]);
  return user;
}
