import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { departments } from '../../lib/api';
import { ArrowRight } from 'lucide-react';
import { updateDepartment } from '../../lib/api';

function DepartmentComparison({ departmentStats }) {
    const [updating, setUpdating] = useState(false);

    const handleUpdateDepartment = async (department) => {
        setUpdating(true);
        try {
            await updateDepartment(department);
            toast.success('Department updated successfully');
            window.location.reload(); // Refresh to see new stats
        } catch (error) {
            toast.error('Failed to update department');
        }
        setUpdating(false);
    };

    const getProbabilityColor = (probability) => {
        switch (probability) {
            case 'High': return 'text-green-600';
            case 'Medium': return 'text-yellow-600';
            case 'Low': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Department
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Your Rank
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Total Students
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Capacity
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Probability
                        </th>
                        <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {departmentStats.map((stat, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {stat.department}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                #{stat.rank}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {stat.totalInDepartment}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {stat.capacity}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={`font-medium ${getProbabilityColor(stat.probability)}`}>
                                    {stat.probability}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button
                                    onClick={() => handleUpdateDepartment(stat.department)}
                                    disabled={updating}
                                    className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                                >
                                    {updating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                            Updating...
                                        </>
                                    ) : (
                                        <>
                                            <ArrowRight className="h-4 w-4 mr-1" />
                                            Switch
                                        </>
                                    )}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DepartmentComparison