import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Token added to headers:', config.headers.Authorization); // Debugging log
  } else {
    console.log('No token found in localStorage'); // Debugging log
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const register = async (studentData) => {
  const response = await api.post('/auth/register', studentData);
  const { token, student } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(student));
  return response.data;
};

export const login = async (studentId, email, password) => {
  const response = await api.post('/auth/login', { studentId, email, password });
  const { token, student } = response.data;
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(student));
  return response.data;
};

export const getStats = async () => {
  try {
    const response = await api.get('/stats');
    return response.data;
  } catch (error) {
    co
  }
};

export const getDepartmentStats = async (department) => {
  try {
    const response = await api.get(`/stats/${department}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching department stats:', error);
    
  }
};

export const updateDepartment = async (department, data) => {
  try {
    const response = await api.put(`/update-department`, { department, ...data });
    return response.data;
  } catch (error) {
    console,error('Error updating department:', error);
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
  'Pharmacy',
  'Nursing',
  'Information Science',
  'Doctor of Veterinary Medicine',
  'Medical Laboratory Science',
  'Public Health',
  'Midwifery',
  'Law',
];

export default api;