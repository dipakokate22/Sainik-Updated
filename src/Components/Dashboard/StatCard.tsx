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
    <div className={`rounded-xl shadow-md p-6 ${color}`}>
        <div className="flex items-center justify-between">
            <div className={`p-4 rounded-lg ${iconBgColor}`}>
                <Icon size={32} className="text-white"/>
            </div>
        </div>
        <div className="mt-4">
            <h3 className="text-lg font-medium text-gray-700">{title}</h3>
            <p className="text-3xl font-bold text-gray-800">{value}</p>
            {subtitle && <p className="text-sm text-gray-600 mt-1">{subtitle}</p>}
        </div>
    </div>
  );
};

export default StatCard;