// app/components/dashboard/StatCard.tsx
import React from 'react';
import { LucideProps } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: React.ElementType<LucideProps>;
  color: string;
  iconBgColor: string;
}

const StatCard = ({ title, value, subtitle, icon: Icon, color, iconBgColor }: StatCardProps) => {
  return (
    <div className={`rounded-xl shadow-md p-3 sm:p-6 w-full ${color}`}>
        <div className="flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2 xs:gap-0">
            <div className={`p-2 sm:p-4 rounded-lg ${iconBgColor}`}>
                <Icon size={24} className="text-white sm:hidden" />
                <Icon size={32} className="text-white hidden sm:block" />
            </div>
        </div>
        <div className="mt-2 sm:mt-4">
            <h3 className="text-sm sm:text-lg font-medium text-gray-700">{title}</h3>
            <p className="text-xl sm:text-3xl font-bold text-gray-800">{value}</p>
            {subtitle && <p className="text-xs sm:text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
    </div>
  );
};

export default StatCard;