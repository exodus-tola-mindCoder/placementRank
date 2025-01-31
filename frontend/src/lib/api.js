import axios from 'axios';

const API_URL = 'http://localhost:5001/api'; // Use proxy path

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  return response.data;
};

export const register = async (studentData) => {
  const response = await api.post('/auth/register', studentData);
  return response.data;
};

export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
};

export const getDepartmentStats = async (department) => {
  try {
    const response = await api.get(`/stats/department/${department}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching department stats ${department}:`, error);
    return null;
  }
};

export const updateDepartment = async (department) => {
  try {
    const response = await api.put('/update-department', { department });
    return response.data;
  } catch (error) {
    console.error('Error updating department:', error);
    return null;
  }
};

export const departments = [
  'Software Engineering',
  'Computer Science',
  'Information Technology',
  'Information Systems',
  'Electrical Engineering',
  'Mechanical Engineering',
  'Civil Engineering',
  'Chemical Engineering',
  'Medicine',
  'Bioengineering',
];