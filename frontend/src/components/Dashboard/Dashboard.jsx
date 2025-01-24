import React from 'react'
import StatCard from './StatCard'
import { School, Trophy, Users } from 'lucide-react'
function Dashboard({ stats }) {
  const [departmentStats, setDepartmentStats] = useState([]);
  const [loading, setLoading] = useState(false);
  












  return (
    <div className='max-w-6xl mx-auto space-y-8'>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <StatCard icon={Users}
          title="Total Students"
          value={stats.totalInDepartment}
          subtitle="in your department"
        />
        <StatCard
          icon={Trophy}
          title="Your Rank"
          value={`#${stats.rank}`}
          subtitle="in your department"
        />
        <StatCard
          icon={Users}
          title="Higher Score Students"
          value={stats.higherScores}
          subtitle="in your department"
        />
      </div>

      <div className='bg-white rounded-lg shadow-md p-6'>
        <div className='flex items-center gap-2 mb-6'>
          <School className='text-indigo-600' size={24} />
          <h2 className='text-xl font-semibold'>
            Department Comparison
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading department statistics...</p>
          </div>
        ) : (
          <DepartmentComparison departmentStats={departmentStats} />
        )}



        
      </div>
    </div>
  )
}

export default Dashboard