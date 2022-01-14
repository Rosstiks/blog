export default class ApiService {
  _apiBase = 'https://kata.academy:8022/api';

  getArticlesGlobally = async (page) => {
    const response = await fetch(`${this._apiBase}/articles?limit=5&offset=${(page - 1) * 5}`);
    const data = await response.json();
    return data;
  };

  getArticle = async (slug) => {
    const response = await fetch(`${this._apiBase}/articles/${slug}`);
    const data = await response.json();
    return data;
  };

  createUser = async (userInfo) => {
    const response = await fetch(`${this._apiBase}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userInfo }),
    });
    const result = await response.json();
    return { ok: response.ok, result };
  };

  loginUser = async (userInfo) => {
    const response = await fetch(`${this._apiBase}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userInfo }),
    });
    const result = await response.json();
    return { ok: response.ok, result };
  };

  getCurrentUser = async (token) => {
    const response = await fetch(`${this._apiBase}/user`, {
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const result = await response.json();
    return result.user;
  };

  updateUserInfo = async (userInfo, token) => {
    const response = await fetch(`${this._apiBase}/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: userInfo }),
    });
    const result = await response.json();
    return { ok: response.ok, result };
  };

  createPost = async (data, token) => {
    const response = await fetch(`${this._apiBase}/articles`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  };

  updatePost = async (data, token, slug) => {
    const response = await fetch(`${this._apiBase}/articles/${slug}`, {
      method: 'PUT',
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return result;
  };
}
