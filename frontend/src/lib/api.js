import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const register = async (studentData) => {
  const response = await api.post('/auth/register', studentData);
  return response.data;
};



export const login = async (studentId, email, password) => {
  const response = await api.post('/auth/login', { studentId, email, password });
  return response.data;
};

export const getStats = async () => {
  const response = await api.get('/stats');
  return response.data;
};


export const getDepartmentStats = async (department) => {
  const response = await api.get(`/stats/department/${department}`);
  return response.data;
};

export const updateDepartment = async (department, data) => {
  const response = await api.put('/update-department', { department, data });
  return response.data;
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
  'pharmacy',
  'Nursing',
  'Information Science',
  'Doctor of Veternary Medicine',
  'Medical Laboratory Science',
  'Public Health',
  'midwifery',
  'law'
];

export default api