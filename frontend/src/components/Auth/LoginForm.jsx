import React, { useState } from 'react'
import { login } from '../../lib/api';
import { LogIn } from 'lucide-react';

import toast from 'react-hot-toast';



function LoginForm({ onToggleAuth, onLoginSuccess }) {
    const [studentId, setStudentId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { student, token } = await login({ studentId, email, password });
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(student));
            onLoginSuccess(student);
            toast.success('successfully logged in!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed!');
        }
    };


    return (
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-md p-6'>
            <div className='flex justify-center mb-6'>
                <LogIn size={48} />
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-base font-medium text-gray-700'>Student ID</label>
                    <input
                        type='email'
                        placeholder='Enter your student ID'
                        required value={studentId} onChange={(e) => setStudentId(e.target.value)} className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>
                <div>
                    <label className='block text-base text-gray-700 font-medium'>Email</label>
                    <input
                        type='email'
                        placeholder='Enter your email'
                        required value={email} onChange={(e) => setEmail(e.target.value)} className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>
                <div>
                    <label className='block text-base text-gray-700 font-medium'>Password</label>
                    <input
                        type='password'
                        placeholder='Enter your password'
                        required value={password} onChange={(e) => setPassword(e.target.value)} className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>
                <button type='submit' className='w-full bg-indigo-500 text-white p-3 rounded-md'>Login</button>
            </form>
            <p className='mt-4 text-center text-sm text-gray-600'>Don't have an account?{' '} <button onClick={onToggleAuth} className='text-indigo-500'>Register</button></p>
        </div>
    );
}

export default LoginForm