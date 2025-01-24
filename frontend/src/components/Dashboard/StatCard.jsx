import React from 'react'

function StatCard() {
    return (
        <div className='bg-white rounded-lg shadow-md'>
            <div className='flex items-center justify-center mb-4'>
                <Icon className='text-indigo-600' size={32} />
                <h3 className='text-xl font-base text-center mb-2'>{title}</h3>
                <p className='text-3xl text-center text-gray-700'>{value}</p>
                <p className='text-sm text-center text-gray-500'>{subtitle}</p>
            </div>
        </div>
    );
}

export default StatCard