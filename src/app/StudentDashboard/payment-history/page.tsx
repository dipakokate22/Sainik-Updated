import Sidebar from '../Sidebar';
import Header from '../Header';
import Image from 'next/image';

const PaymentHistoryPage = () => {
  // Data for the payment history table to make the component dynamic and easier to modify.
  const paymentHistoryData = [
    { paymentFor: 'Registration Fees', class: '10th', paymentDate: '25-06-2024', amount: 'Rs. 500', status: 'Paid' },
    { paymentFor: 'Admission Fees', class: '10th', paymentDate: '25-06-2024', amount: 'Rs. 50000', status: 'Paid' },
    { paymentFor: 'Examination Fees', class: '10th', paymentDate: '15-06-2024', amount: 'Rs. 1500', status: 'Pending' },
    { paymentFor: 'Library Fees', class: '10th', paymentDate: '15-06-2024', amount: 'Rs. 1500', status: 'Paid' },
    { paymentFor: 'Sports Fees', class: '10th', paymentDate: '10-06-2024', amount: 'Rs. 2500', status: 'Pending' },
    { paymentFor: 'Cultural Activity Fees', class: '10th', paymentDate: '10-06-2024', amount: 'Rs. 1000', status: 'Failed' },
  ];
  
  // Data for filter tags
  const filterTags = ['Sports Fees', '10th', '25-06-2024', 'Pending'];

  // Helper function to determine status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid':
        return 'text-green-600';
      case 'Pending':
        return 'text-orange-500';
      case 'Failed':
        return 'text-red-600';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="flex w-full bg-[#F7F7F7] font-sans">
      {/* Sidebar Component */}
      {/* You can modify the height and activePage props as needed. */}
      <Sidebar height="1080px" activePage="Payment History" />

      {/* Main Content Area */}
      <main className="relative w-full">
        {/* Header Component */}
        <Header />

        {/* This div contains all the content to the right of the sidebar */}
        <div style={{ top: '80px', left: '0px' }} className="relative p-8">

          {/* Page Title Section */}
          <div style={{ top: '0px', left: '0px' }} className="relative mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Payment History</h1>
            <p className="text-sm text-gray-500">View and track all your past and upcoming payments</p>
          </div>

          {/* Search and Filter Section */}
          <div style={{ top: '20px', left: '0px' }} className="relative flex items-center justify-between mb-4">
            <div style={{ width: '300px', height: '40px' }} className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                 <img src="" alt="Search Icon" className="w-5 h-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search here...."
                className="w-full h-full pl-10 pr-4 text-sm text-gray-700 bg-[#E8F0FE] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2">
              <img src="" alt="Filter Icon" className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          {/* Active Filters Section */}
          <div style={{ top: '120px', left: '0px' }} className="relative flex items-center space-x-2 mb-8">
            {filterTags.map((tag, index) => (
              <div key={index} className="flex items-center bg-white border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-700">
                <span>{tag}</span>
                <button className="ml-2 text-gray-500 hover:text-gray-800">×</button>
              </div>
            ))}
          </div>


          {/* Payment History Table Section */}
          <div style={{ top: '180px', left: '0px' }} className="relative bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center border-b">
              <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600 bg-[#E8F0FE] p-4 rounded-t-lg">
                  <div className="text-left">Payment For</div>
                  <div className="text-center">Class</div>
                  <div className="text-center">Payment Date</div>
                  <div className="text-center">Amount</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Print Receipt</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-200">
                  {paymentHistoryData.map((row, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 p-4 items-center text-sm text-gray-700">
                      <div className="text-left font-medium">{row.paymentFor}</div>
                      <div className="text-center text-gray-500">{row.class}</div>
                      <div className="text-center text-gray-500">{row.paymentDate}</div>
                      <div className="text-center text-gray-500">{row.amount}</div>
                      <div className={`text-center font-semibold ${getStatusColor(row.status)}`}>
                        {row.status}
                      </div>
                      <div className="text-center">
                        <button
                          className={`py-1.5 px-6 rounded-lg text-xs font-semibold text-white transition-colors ${
                            row.status === 'Pending'
                              ? 'bg-gray-500 cursor-not-allowed'
                              : 'bg-blue-600 hover:bg-blue-700'
                          }`}
                          disabled={row.status === 'Pending'}
                        >
                          Print
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
           {/* Custom Scrollbar */}
           <div 
            style={{ 
              position: 'absolute', 
              top: '230px', 
              right: '-15px',
              width: '8px', 
              height: '150px',
              backgroundColor: '#257B5A',
              borderRadius: '4px'
            }}
          ></div>

        </div>
      </main>
    </div>
  );
};

export default PaymentHistoryPage;