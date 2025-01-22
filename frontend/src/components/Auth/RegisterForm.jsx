import React, { useState } from 'react'


import { UserPlus } from 'lucide-react'

function RegisterForm({ onToggleAuth }) {

    const [FormData, setFormData] = useState({
        email: '',
        password: '',
        studentId: '',
        fullName: '',
        department: '',
        averageScore: '',
    });

    const handleChange = (e) => {
        // logic here
    }

    const handleSubmit = async (e) => {
        // logic here
    }





    return (
        <div className='max-w-md mx-auto bg-white round-lg shadow-md p-6'>
            <div className='flex justify-center mb-6'>
                <UserPlus size={48} />
            </div>
            <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>

            {/* form */}

            <form onSubmit={handleSubmit} className='space-y-4'>
                <div>
                    <label className='block text-base font-medium text-gray-700'>Student ID
                    </label>
                    <input
                        text='text'
                        name='studentId'
                        placeholder='Enter your student ID'
                        required value={FormData.studentId} onChange={handleChange}
                        className='mt-1 block w-full round-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>
                <div>
                    <label className='block text-base text-gray-700 font-medium'>Full Name</label>
                    <input
                        text='text'
                        name='fullName'
                        placeholder='Enter your full name'
                        required value={FormData.fullName} onChange={handleChange}
                        className='mt-1 block w-full round-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>
                <div>
                    <label className='block text-base text-gray-700 font-medium'>Email</label>
                    <input
                        text='text'
                        name='email'
                        placeholder='Enter your email'
                        required value={FormData.email} onChange={handleChange}
                        className='mt-1 block w-full round-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>
                <div>
                    <label className='block text-base text-gray-700 font-medium'>Password</label>
                    <input
                        text='password'
                        name='password'
                        placeholder='Enter your password'
                        required value={FormData.password} onChange={handleChange}
                        className='mt-1 block w-full round-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>
                <div>
                    <label className='block text-base text-gray-700 font-medium'>Department</label>
                    <select name='department' placeholder='Select your department' required value={FormData.department} onChange={handleChange} className='mt-1 block w-full round-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'>
                        <option value="">Select Department</option>
                        <option value="CSE">CSE</option>
                        <option value="EEE">EEE</option>
                        <option value="BBA">BBA</option>
                    </select>
                </div>
                <div>
                    <label className='block text-base text-gray-700 font-medium'>Average Score</label>
                    <input
                        text='number'
                        name='averageScore'
                        placeholder='Enter your average score'
                        step='0.01'
                        min='0'
                        max='100'
                        required value={FormData.averageScore} onChange={handleChange} className='mt-1 block w-full round-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
                    />
                </div>

                {/* button */}
                <button type='submit' className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold p-3 rounded-md'>Register</button>
            </form>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <button
                    onClick={onToggleAuth}
                    className="text-indigo-600 hover:text-indigo-500"
                >
                    Login
                </button>
            </p>
        </div>
    );
}

export default RegisterForm