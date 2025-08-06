import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const AppliedSchoolsPage = () => {
  const availableSchools = [
    { id: 1, name: 'Army Public School', location: 'Delhi', grade: '1st-12th', type: 'Military', image: '/student_dashboard/school1.png' },
    { id: 2, name: 'Sainik Public School', location: 'Mumbai', grade: '1st-12th', type: 'Military', image: '/student_dashboard/school2.png' },
    { id: 3, name: 'Rashtriya Military School', location: 'Bangalore', grade: '1st-12th', type: 'Military', image: '/student_dashboard/school3.png' },
    { id: 4, name: 'Defence Public School', location: 'Chennai', grade: '1st-12th', type: 'Military', image: '/student_dashboard/school4.png' },
  ];

  const appliedSchools = [
    { school: 'Army Public School', location: 'Delhi', appliedDate: '15-06-2025', status: 'Applied', preference: 1 },
    { school: 'Sainik Public School', location: 'Mumbai', appliedDate: '15-06-2025', status: 'Applied', preference: 2 },
    { school: 'Defence Public School', location: 'Chennai', appliedDate: '15-06-2025', status: 'Applied', preference: 3 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'text-blue-600 bg-blue-50';
      case 'Accepted': return 'text-green-600 bg-green-50';
      case 'Rejected': return 'text-red-600 bg-red-50';
      case 'Waitlisted': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={`relative bg-[#F7F1EE] min-h-screen ${poppins.className}`}>
      <Sidebar activePage="Applied Schools" />
      <main className="md:ml-[270px] flex flex-col min-h-screen">
        <Header />
        <div className="px-8 py-8">
          {/* Top Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-black mb-2">Applied Schools</h1>
            <p className="text-sm text-[#6C6B6B]">Track your school applications</p>
          </div>

          {/* Application Status Cards */}
          <div className="flex flex-col md:flex-row gap-10 mb-10">
            <div className="bg-[#2C946D] rounded-[10px] shadow-[0px_0px_15px_0px_#00000059] p-8 flex-1">
              <div className="flex items-center justify-between">
                <div className="text-5xl font-bold text-white">{appliedSchools.length}</div>
                <div className="text-right">
                  <div className="text-lg font-medium text-white">Total Applications</div>
                  <div className="text-sm text-white mt-1">Schools applied for</div>
                </div>
              </div>
            </div>
            <div className="bg-[#A36BC3] rounded-[10px] shadow-[0px_0px_15px_0px_#00000059] p-8 flex-1">
              <div className="flex items-center justify-between">
                <div className="text-5xl font-bold text-white">0</div>
                <div className="text-right">
                  <div className="text-lg font-medium text-white">Pending Results</div>
                  <div className="text-sm text-white mt-1">Awaiting response</div>
                </div>
              </div>
            </div>
            <div className="bg-[#BE785A] rounded-[10px] shadow-[0px_0px_15px_0px_#00000059] p-8 flex-1">
              <div className="flex items-center justify-between">
                <div className="text-5xl font-bold text-white">0</div>
                <div className="text-right">
                  <div className="text-lg font-medium text-white">Accepted Applications</div>
                  <div className="text-sm text-white mt-1">Successful applications</div>
                </div>
              </div>
            </div>
          </div>

          {/* Available Schools to Apply */}
          <div className="bg-white rounded-lg shadow-md mb-8 p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-semibold text-lg text-black">Available Schools</h2>
              <span className="text-sm text-gray-500">Choose schools to apply for</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {availableSchools.map((school) => (
                <div key={school.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-1">{school.name}</h3>
                      <p className="text-sm text-gray-600 mb-1">📍 {school.location}</p>
                      <p className="text-sm text-gray-600 mb-1">🎓 Grades: {school.grade}</p>
                      <p className="text-sm text-gray-600 mb-3">🏛️ Type: {school.type}</p>
                      <button className="bg-[#5B63B7] text-white text-sm font-medium py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors">
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Applied Schools Table */}
          <div className="bg-white rounded-lg shadow-md overflow-x-auto border border-black">
            <div className="flex justify-between items-center px-4 py-4 border-b border-black">
              <h2 className="font-semibold text-lg text-black">Your Applications</h2>
              <button className="text-sm font-medium text-[#5346DC]">View All</button>
            </div>

            <table className="w-full text-center border-collapse">
              <thead>
                <tr className="bg-[#EAF1FF] h-14 border-b border-black">
                  <th className="font-medium text-sm text-left pl-4 text-black border-r border-black last:border-r-0">School</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Location</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Applied Date</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Preference</th>
                  <th className="font-medium text-sm text-black border-r border-black last:border-r-0">Status</th>
                  <th className="font-medium text-sm text-black">Action</th>
                </tr>
              </thead>
              <tbody>
                {appliedSchools.map((app, index) => (
                  <tr key={index} className="h-[70px] border-b border-black last:border-b-0">
                    <td className="text-sm text-left pl-4 text-[#6C6B6B] border-r border-black">{app.school}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">{app.location}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">{app.appliedDate}</td>
                    <td className="text-sm text-[#6C6B6B] border-r border-black">#{app.preference}</td>
                    <td className="border-r border-black">
                      <span className={`text-sm font-medium px-3 py-1 rounded-full ${getStatusColor(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <button className="text-sm text-[#4D4D4D] hover:text-blue-600">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppliedSchoolsPage;