// app/components/dashboard/StudentListTable.tsx
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

const students = [
  { no: '01', name: 'Dipali', adminDate: '12 may 2025', status: 'Checkin', subject: 'Science', fees: '1234$' },
  { no: '01', name: 'Dipali', adminDate: '12 may 2025', status: 'Checkin', subject: 'Science', fees: '1234$' },
  { no: '01', name: 'Dipali', adminDate: '12 may 2025', status: 'Checkin', subject: 'Science', fees: '1234$' },
  { no: '01', name: 'Dipali', adminDate: '12 may 2025', status: 'Checkin', subject: 'Science', fees: '1234$' },
];

const StudentListTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">New Student List</h3>
        <input 
          type="text" 
          placeholder="Search Student" 
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-3 px-4 font-semibold text-gray-600">No.</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Name</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Date Of Admin</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Subject</th>
              <th className="py-3 px-4 font-semibold text-gray-600">Fees</th>
              <th className="py-3 px-4 font-semibold text-gray-600 text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-3 px-4 text-gray-700">{student.no}</td>
                <td className="py-3 px-4 text-gray-700">{student.name}</td>
                <td className="py-3 px-4 text-gray-700">{student.adminDate}</td>
                <td className="py-3 px-4">
                  <span className="bg-checkin-green text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {student.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-700">{student.subject}</td>
                <td className="py-3 px-4 text-gray-700">{student.fees}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center items-center gap-2">
                    <button className="p-1 rounded bg-green-100 text-green-600 hover:bg-green-200">
                      <Pencil size={16} />
                    </button>
                    <button className="p-1 rounded bg-red-100 text-red-600 hover:bg-red-200">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentListTable;