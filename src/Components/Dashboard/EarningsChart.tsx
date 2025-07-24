// app/components/dashboard/EarningsChart.tsx
'use client';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Jan', income: 180000, expense: 120000 },
  { name: 'Feb', income: 200000, expense: 140000 },
  { name: 'Mar', income: 220000, expense: 180000 },
  { name: 'Apr', income: 210000, expense: 160000 },
  { name: 'May', income: 230000, expense: 150000 },
  { name: 'June', income: 240000, expense: 170000 },
  { name: 'July', income: 220000, expense: 190000 },
  { name: 'Aug', income: 210000, expense: 150000 },
  { name: 'Sep', income: 235000, expense: 165000 },
  { name: 'Oct', income: 215000, expense: 140000 },
  { name: 'Nov', income: 190000, expense: 120000 },
  { name: 'Dec', income: 220000, expense: 130000 },
];

// Custom Tooltip from the image
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
        <p className="text-sm font-semibold text-gray-700">{`Sep 23 2024`}</p>
        <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-income-green"></div>
                <p className="text-sm text-gray-600">Income: <span className="font-bold">${payload[0].value.toLocaleString()}</span></p>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-expense-red"></div>
                <p className="text-sm text-gray-600">Expense: <span className="font-bold">${payload[1].value.toLocaleString()}</span></p>
            </div>
        </div>
      </div>
    );
  }
  return null;
};


const EarningsChart = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">Earnings</h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-income-green"></div>
          <span className="text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-expense-red"></div>
          <span className="text-gray-600">Expense</span>
        </div>
      </div>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis 
                tickFormatter={(value: number) => `${value / 1000}k`}
                domain={[0, 250000]}
                ticks={[0, 100000, 180000, 200000, 250000]}
                tickLine={false} 
                axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22C55E"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#EF4444"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default EarningsChart;