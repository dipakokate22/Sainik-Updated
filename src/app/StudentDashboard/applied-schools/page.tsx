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

  const sidebarHeight="850px";
  return (
    <div className={`flex bg-white ${poppins.className}`}>
      <Sidebar height={sidebarHeight} activePage="Applied Schools" />
      <main className="relative w-[994px] h-[852px] opacity-100">
        <Header />
        <div className="p-[32px]">
          {/* Top Text Div */}
          <div className="relative w-[947px] h-[87px] top-[40px] rounded-[5px] opacity-100">
            <div className="absolute top-[14px] left-[4px] w-[335.7px] h-[57px] opacity-100">
              <h1 className="w-[335.7px] h-[36px] top-[14px] left-[4px] font-semibold text-[24px] leading-[100%] text-black">
                Applied Schools
              </h1>
              <p className="w-[281px] h-[21px] top-[30px] left-[4px] font-normal text-[14px] leading-[100%] text-[#6C6B6B] mt-2">
                Track Your school applications
              </p>
            </div>
          </div>

          {/* Application Status Cards */}
          <div className="relative top-[60px] left-[1px] flex space-x-[35px]">
            <Image
              src="/student_dashboard/total_application.png"
              alt="Total Applications"
              width={285}
              height={143}
              className="rounded-[10px] shadow-[0px_0px_15px_0px_#00000059]"
            />
            <Image
              src="/student_dashboard/pending_application.png"
              alt="Pending Applications"
              width={285}
              height={143}
              className="rounded-[10px] shadow-[0px_0px_15px_0px_#00000059]"
            />
            <Image
              src="/student_dashboard/accepted_application.png"
              alt="Accepted Applications"
              width={285}
              height={143}
              className="rounded-[10px] shadow-[0px_0px_15px_0px_#00000059]"
            />
          </div>
          
          {/* Your Applications Table */}
          <div className="relative top-[120px] w-[930px] h-auto bg-white 6 rounded-lg shadow-md border border-black">
          <div className="flex justify-between items-center mb-4 pt-[15px]">
              <h2 className="font-semibold text-lg text-black pl-[30px]">Your Applications</h2>
              <button className="text-sm font-medium pr-[20px] text-[#5346DC]">View All</button>
          </div>
          <table className="w-full text-center border-collapse">
              <thead>
              <tr className="bg-[#EAF1FF] h-[56px] divide-x divide-black">
                  <th className="font-medium text-sm text-left pl-4 text-[#000000] border-b border-black">School</th>
                  <th className="font-medium text-sm text-[#000000] border-b border-black">Class</th>
                  <th className="font-medium text-sm text-[#000000] border-b border-black">Applied Date</th>
                  <th className="font-medium text-sm text-[#000000] border-b border-black">Accepted Date</th>
                  <th className="font-medium text-sm text-[#000000] border-b border-black">Status</th>
                  <th className="font-medium text-sm text-[#000000] border-b border-black">Action</th>
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