import Image from 'next/image';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const AppliedSchoolsPage = () => {
  const applications = [
    { school: 'Army Public School', class: '11th', appliedDate: '15-06-2025', acceptedDate: '25-06-2025', status: 'Accepted' },
    { school: 'Sainik Public School', class: '11th', appliedDate: '25-06-2025', acceptedDate: '-', status: 'Waitlisted' },
    { school: 'Army Public School', class: '11th', appliedDate: '15-06-2025', acceptedDate: '25-06-2025', status: 'Accepted' },
    { school: 'Sainik Public School', class: '11th', appliedDate: '25-06-2025', acceptedDate: '-', status: 'Waitlisted' },
  ];

  return (
    <div className={`relative bg-white min-h-screen ${poppins.className}`}>
      <Sidebar activePage="Applied Schools" />
      <main className="md:ml-[270px]  flex flex-col min-h-screen">
        <Header />
        <div className="w-full pt-[50px] px-4 md:px-8 xl:px-12">

          {/* Top Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-black mb-2">Applied Schools</h1>
            <p className="text-sm text-[#6C6B6B]">Track your school applications</p>
          </div>

          {/* Application Status Cards */}
          <div className="flex flex-col md:flex-row gap-6 mb-10">
            <Image
              src="/student_dashboard/total_application.png"
              alt="Total Applications"
              width={285}
              height={143}
              className="rounded-[10px] shadow-[0px_0px_15px_0px_#00000059] w-full max-w-[285px] h-auto"
            />
            <Image
              src="/student_dashboard/pending_application.png"
              alt="Pending Applications"
              width={285}
              height={143}
              className="rounded-[10px] shadow-[0px_0px_15px_0px_#00000059] w-full max-w-[285px] h-auto"
            />
            <Image
              src="/student_dashboard/accepted_application.png"
              alt="Accepted Applications"
              width={285}
              height={143}
              className="rounded-[10px] shadow-[0px_0px_15px_0px_#00000059] w-full max-w-[285px] h-auto"
            />
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow-md border border-black overflow-x-auto">
            <div className="flex justify-between items-center px-4 py-4">
              <h2 className="font-semibold text-lg text-black">Your Applications</h2>
              <button className="text-sm font-medium text-[#5346DC]">View All</button>
            </div>

            <table className="w-full text-center border-collapse">

              <thead>
                <tr className="bg-[#EAF1FF] h-14 divide-x divide-black">
                  <th className="font-medium text-sm text-left pl-4 text-black border-b border-black">School</th>
                  <th className="font-medium text-sm text-black border-b border-black">Class</th>
                  <th className="font-medium text-sm text-black border-b border-black">Applied Date</th>
                  <th className="font-medium text-sm text-black border-b border-black">Accepted Date</th>
                  <th className="font-medium text-sm text-black border-b border-black">Status</th>
                  <th className="font-medium text-sm text-black border-b border-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black">
                {applications.map((app, index) => (
                  <tr key={index} className="h-[70px] divide-x divide-black">
                    <td className="text-sm text-left pl-4 text-[#6C6B6B]">{app.school}</td>
                    <td className="text-sm text-[#6C6B6B]">{app.class}</td>
                    <td className="text-sm text-[#6C6B6B]">{app.appliedDate}</td>
                    <td className="text-sm text-[#6C6B6B]">{app.acceptedDate}</td>
                    <td className="text-sm text-[#6C6B6B]">{app.status}</td>
                    <td><button className="text-sm text-[#4D4D4D]">View</button></td>
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
