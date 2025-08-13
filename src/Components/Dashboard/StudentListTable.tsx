import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

// Sample data with different statuses
const students = [
  { no: '01', name: 'Dipali', adminDate: '12 may 2025', status: 'done', subject: 'Science', fees: '₹1234' },
  { no: '02', name: 'Rahul', adminDate: '15 may 2025', status: 'pending', subject: 'Math', fees: '₹1500' },
  { no: '03', name: 'Priya', adminDate: '18 may 2025', status: 'failed', subject: 'English', fees: '₹1200' },
  { no: '04', name: 'Amit', adminDate: '20 may 2025', status: 'done', subject: 'Physics', fees: '₹1800' },
  { no: '05', name: 'Sneha', adminDate: '22 may 2025', status: 'pending', subject: 'Chemistry', fees: '₹1600' },
];

// Function to get status styling
const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case 'done':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'failed':
      return 'bg-red-100 text-red-800 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const StudentListTable = () => {
  return (
    <div className="bg-white p-3 sm:p-6 rounded-lg shadow-md col-span-1 lg:col-span-2 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-0">
        <h3 className="text-lg sm:text-xl font-semibold text-black">New Student List</h3>
        <input 
          type="text" 
          placeholder="Search Student" 
          className="px-3 py-2 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base w-full sm:w-auto text-black placeholder-gray-300"

        />
      </div>
      {/* Responsive Table: horizontal scroll on mobile */}
      <div className="overflow-x-auto h-[280px] pr-2 scrollbar-thin scrollbar-thumb-badge-green scrollbar-track-gray-100">
        <table className="w-full min-w-[600px] text-left text-sm sm:text-base">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b">
              <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">No.</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Name</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Date Of Admin</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Status</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Subject</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600">Fees</th>
              <th className="py-2 sm:py-3 px-2 sm:px-4 font-semibold text-gray-600 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-700">{student.no}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-700">{student.name}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-700">{student.adminDate}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4">
                  <span className={`text-xs font-semibold px-3 sm:px-4 py-1.5 rounded-full capitalize ${getStatusStyle(student.status)}`}>
                    {student.status}
                  </span>
                </td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-700">{student.subject}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4 text-gray-700">{student.fees}</td>
                <td className="py-2 sm:py-4 px-2 sm:px-4">
                  <div className="flex justify-center items-center gap-2">
                    <button 
                      className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                      title="Edit Student"
                    >
                      <Pencil size={16} />
                    </button>
                    <button 
                      className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 shadow-sm"
                      title="Delete Student"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Optional: Stacked card layout for xs screens */}
      <div className="block sm:hidden mt-4 space-y-3">
        {students.map((student, index) => (
          <div key={index} className="border rounded-lg p-3 shadow flex flex-col gap-1">
            <div className="flex justify-between"><span className="font-semibold">No.</span><span>{student.no}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Name</span><span>{student.name}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Date Of Admin</span><span>{student.adminDate}</span></div>
            <div className="flex justify-between">
              <span className="font-semibold">Status</span>
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full capitalize ${getStatusStyle(student.status)}`}>
                {student.status}
              </span>
            </div>
            <div className="flex justify-between"><span className="font-semibold">Subject</span><span>{student.subject}</span></div>
            <div className="flex justify-between"><span className="font-semibold">Fees</span><span>{student.fees}</span></div>
            <div className="flex justify-end gap-2 mt-2">
              <button 
                className="p-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 shadow-sm"
                title="Edit Student"
              >
                <Pencil size={16} />
              </button>
              <button 
                className="p-2 rounded-md bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 shadow-sm"
                title="Delete Student"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentListTable;