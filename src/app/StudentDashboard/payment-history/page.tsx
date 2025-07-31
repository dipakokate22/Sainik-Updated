import Sidebar from '../Sidebar';
import Header from '../Header';

const PaymentHistoryPage = () => {
  const paymentHistoryData = [
    { paymentFor: 'Registration Fees', class: '10th', paymentDate: '25-06-2024', amount: 'Rs. 500', status: 'Paid' },
    { paymentFor: 'Admission Fees', class: '10th', paymentDate: '25-06-2024', amount: 'Rs. 50000', status: 'Paid' },
    { paymentFor: 'Examination Fees', class: '10th', paymentDate: '15-06-2024', amount: 'Rs. 1500', status: 'Pending' },
    { paymentFor: 'Library Fees', class: '10th', paymentDate: '15-06-2024', amount: 'Rs. 1500', status: 'Paid' },
    { paymentFor: 'Sports Fees', class: '10th', paymentDate: '10-06-2024', amount: 'Rs. 2500', status: 'Pending' },
    { paymentFor: 'Cultural Activity Fees', class: '10th', paymentDate: '10-06-2024', amount: 'Rs. 1000', status: 'Failed' },
  ];

  const filterTags = ['Sports Fees', '10th', '25-06-2024', 'Pending'];

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
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-[#F7F7F7] font-sans">
      <Sidebar height="auto" activePage="Payment History" />

      <main className="flex-1">
        <Header />

        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-gray-800">Payment History</h1>
            <p className="text-sm text-gray-500">View and track all your past and upcoming payments</p>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative w-full md:w-[300px] h-[40px]">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </span>
              <input
                type="text"
                placeholder="Search here...."
                className="w-full h-full pl-10 pr-4 text-sm text-gray-700 bg-[#E8F0FE] border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button className="p-2">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2H3V4zM3 8h18v12a1 1 0 01-1 1H4a1 1 0 01-1-1V8z"></path></svg>
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {filterTags.map((tag, index) => (
              <div key={index} className="flex items-center bg-white border border-gray-300 rounded-full py-1 px-3 text-sm text-gray-700">
                <span>{tag}</span>
                <button className="ml-2 text-gray-500 hover:text-gray-800">×</button>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-800">Payment History</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline mt-2 md:mt-0">View All</a>
            </div>

            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-600 bg-[#E8F0FE] p-4 rounded-t-lg min-w-[600px]">
                  <div className="text-left">Payment For</div>
                  <div className="text-center">Class</div>
                  <div className="text-center">Payment Date</div>
                  <div className="text-center">Amount</div>
                  <div className="text-center">Status</div>
                  <div className="text-center">Print Receipt</div>
                </div>

                <div className="divide-y divide-gray-200">
                  {paymentHistoryData.map((row, index) => (
                    <div key={index} className="grid grid-cols-6 gap-4 p-4 items-center text-sm text-gray-700 min-w-[600px]">
                      <div className="text-left font-medium">{row.paymentFor}</div>
                      <div className="text-center text-gray-500">{row.class}</div>
                      <div className="text-center text-gray-500">{row.paymentDate}</div>
                      <div className="text-center text-gray-500">{row.amount}</div>
                      <div className={`text-center font-semibold ${getStatusColor(row.status)}`}>{row.status}</div>
                      <div className="text-center">
                        <button
                          className={`py-1.5 px-6 rounded-lg text-xs font-semibold text-white transition-colors ${
                            row.status === 'Pending' ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
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
        </div>
      </main>
    </div>
  );
};

export default PaymentHistoryPage;
