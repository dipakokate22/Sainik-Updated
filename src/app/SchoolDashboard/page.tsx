import React from 'react';
// Corrected import paths
import StatCard from '@/Components/Dashboard/StatCard';
import RenewSection from '@/Components/Dashboard/RenewSection';
import StudentListTable from '@/Components/Dashboard/StudentListTable';
import EarningsChart from '@/Components/Dashboard/EarningsChart';
import { Users, UserPlus, GraduationCap, DollarSign } from 'lucide-react';

const DashboardHomePage = () => {
  return (
    <div className="space-y-6">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
         <StatCard 
          title="Student Count" 
          value="1200" 
          subtitle="Students" 
          icon={Users}
          color="bg-blue-100"
          iconBgColor="bg-blue-400"
        />
        <StatCard 
          title="New Student" 
          value="50%" 
          subtitle="Increase in 20 Days" 
          icon={UserPlus}
          color="bg-green-100"
          iconBgColor="bg-green-400"
        />
        <StatCard 
          title="Courses" 
          value="23" 
          icon={GraduationCap}
          color="bg-yellow-100"
          iconBgColor="bg-yellow-400"
        />
        <StatCard 
          title="Payment" 
          value="$2000" 
          icon={DollarSign}
          color="bg-red-100"
          iconBgColor="bg-red-400"
        />
      </div>

      {/* Renew and Student List Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RenewSection />
        <StudentListTable />
      </div>

      {/* Earnings Chart Section */}
      <EarningsChart />
    </div>
  );
};

export default DashboardHomePage;