import React from 'react'

function StatCard({icon: Icon, title, value, subtitle}) {
    return (
        <div className='bg-gray-100 p-6 rounded-lgshadow-md'>
            <div className='block items-center justify-center align-center mb-4'>
                <Icon className='text-indigo-600' size={32} />
                <h3 className='text-xl font-semibold text-center mb-2'>{title}</h3>
                <p className='text-3xl text-center text-gray-700'>{value}</p>
                <p className='text-sm text-center text-gray-500'>{subtitle}</p>
            </div>
        </div>
    );
}

export default StatCard