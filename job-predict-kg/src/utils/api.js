const BASE_URL = '/api';

const fetchWithAuth = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${url}`, { ...options, headers });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || 'Server Error');
  }
  return response.json();
};

export const authAPI = {
  register: async (data) => {
    const res = await fetchWithAuth('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.token) localStorage.setItem('token', res.token);
    return res;
  },
  login: async (data) => {
    const res = await fetchWithAuth('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    if (res.token) localStorage.setItem('token', res.token);
    return res;
  },
  logout: () => {
    localStorage.removeItem('token');
  }
};

export const vacanciesAPI = {
  getAll: async () => {
    return fetchWithAuth('/vacancies');
  },
  create: async (data) => {
    return fetchWithAuth('/vacancies', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
};

export const applicationsAPI = {
  apply: async (data) => {
    return fetchWithAuth('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
  getSeekerApps: async () => {
    return fetchWithAuth('/applications/seeker');
  },
  getEmployerApps: async () => {
    return fetchWithAuth('/applications/employer');
  },
  updateStatus: async (id, status) => {
    return fetchWithAuth(`/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }
};
