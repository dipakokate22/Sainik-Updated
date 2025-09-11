'use client';
import { useState, useEffect } from 'react';
import Sidebar from '../Sidebar';
import Header from '../Header';
import { getSubscriptionPlans, getUserSubscriptions, purchaseSubscriptionPlan } from '../../../../services/studentServices';

// Type definitions
interface SubscriptionPlan {
  id: number;
  plan_name: string;
  plan_amount: string;
  number_of_attempts: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface ExamAttempts {
  total_attempts_allowed: number;
  total_used_attempts: number;
  total_remaining_attempts: number;
  can_attempt_exams: boolean;
}

interface ActiveSubscription {
  plan_name?: string;
  [key: string]: any;
}

interface Transaction {
  id?: number;
  plan_name?: string;
  amount?: string;
  created_at?: string;
  status?: string;
  [key: string]: any;
}

interface UserSubscriptions {
  transactions: Transaction[];
  active_subscription: ActiveSubscription | null;
  total_transactions: number;
  successful_transactions: number;
  exam_attempts: ExamAttempts;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

const PaymentHistoryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [subscriptionPlan, setSubscriptionPlan] = useState<SubscriptionPlan | null>(null);
  const [userSubscriptions, setUserSubscriptions] = useState<UserSubscriptions | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState<boolean>(false);

  // Get user ID from localStorage or your auth context
  const getUserId = (): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId') || '84'; // fallback to your example user ID
    }
    return '84';
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [planData, userSubData] = await Promise.all([
          getSubscriptionPlans() as Promise<ApiResponse<SubscriptionPlan>>,
          getUserSubscriptions(getUserId()) as Promise<ApiResponse<UserSubscriptions>>
        ]);
        
        setSubscriptionPlan(planData.data);
        setUserSubscriptions(userSubData.data);
      } catch (err: unknown) {
        const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handlePurchase = async () => {
    try {
      setPurchasing(true);
      const userId = getUserId();
      const planId = subscriptionPlan?.id;
      
      if (!userId || !planId) {
        throw new Error('Missing user ID or plan ID');
      }

      const result = await purchaseSubscriptionPlan(userId, planId) as ApiResponse<any>;
      
      if (result.success) {
        // Refresh user subscriptions after successful purchase
        const updatedUserSubs = await getUserSubscriptions(userId) as ApiResponse<UserSubscriptions>;
        setUserSubscriptions(updatedUserSubs.data);
        alert('Subscription purchased successfully!');
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred';
      setError(errorMessage);
      alert(`Purchase failed: ${errorMessage}`);
    } finally {
      setPurchasing(false);
    }
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Paid':
      case 'Active':
      case 'Success':
        return 'text-green-600';
      case 'Completed':
        return 'text-blue-600';
      case 'Failed':
      case 'Missed':
        return 'text-red-600';
      case 'Pending':
        return 'text-orange-500';
      default:
        return 'text-gray-500';
    }
  };

  const getAttemptColor = (remaining: number, total: number): string => {
    if (remaining === 0) return 'text-red-600';
    if (remaining <= total * 0.3) return 'text-orange-500';
    return 'text-green-600';
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#F7F1EE] relative overflow-hidden">
        <Sidebar activePage="Payment History" />
        <div className="flex-1 flex flex-col min-h-screen bg-[#F7F1EE] overflow-hidden">
          <Header />
          <main className="flex-grow md:ml-[270px] flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#257B5A] mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading subscription data...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-[#F7F1EE] relative overflow-hidden">
        <Sidebar activePage="Payment History" />
        <div className="flex-1 flex flex-col min-h-screen bg-[#F7F1EE] overflow-hidden">
          <Header />
          <main className="flex-grow md:ml-[270px] flex items-center justify-center">
            <div className="text-center bg-red-50 p-6 rounded-lg border border-red-200">
              <p className="text-red-600">Error loading data: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F7F1EE] relative overflow-hidden">
      <Sidebar activePage="Payment History" />

      {/* Mobile Hamburger */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-[#257B5A] p-2 rounded text-white shadow-lg"
        aria-label="Open sidebar menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div className="flex-1 flex flex-col min-h-screen bg-[#F7F1EE] overflow-hidden">
        <Header />

        <main className="flex-grow md:ml-[270px]">
          <div className="px-8 py-8">
            {/* Page Heading */}
            <div className="mb-6">
              <h1 className="text-2xl font-semibold text-gray-800">Payment History</h1>
              <p className="text-sm text-gray-500">View and track all your subscription and payment details</p>
            </div>

            {/* Pay for New Entrance Exam Section */}
            {subscriptionPlan && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Available Subscription Plan</h2>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-lg font-medium text-gray-800">{subscriptionPlan.plan_name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Includes {subscriptionPlan.number_of_attempts} exam attempts
                      </p>
                      <p className="text-sm text-gray-600">
                        Plan Status: {subscriptionPlan.is_active ? 'Active' : 'Inactive'}
                      </p>
                      <div className="mt-2">
                        <span className="text-2xl font-bold text-green-600">
                          Rs. {parseFloat(subscriptionPlan.plan_amount).toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 ml-2">per subscription</span>
                      </div>
                    </div>
                    <button 
                      onClick={handlePurchase}
                      disabled={purchasing || !subscriptionPlan.is_active}
                      className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                        purchasing || !subscriptionPlan.is_active
                          ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                          : 'bg-[#257B5A] hover:bg-[#1e6b4a] text-white'
                      }`}
                    >
                      {purchasing ? 'Processing...' : 'Purchase Plan'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Current Subscription Status */}
            {userSubscriptions && (
              <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Subscription Status</h2>
                
                {userSubscriptions.active_subscription ? (
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Active Plan</p>
                        <p className="font-medium text-gray-800">
                          {userSubscriptions.active_subscription.plan_name || 'Active Subscription'}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Exam Attempts</p>
                        <p className={`font-medium ${getAttemptColor(
                          userSubscriptions.exam_attempts.total_remaining_attempts,
                          userSubscriptions.exam_attempts.total_attempts_allowed
                        )}`}>
                          {userSubscriptions.exam_attempts.total_used_attempts}/
                          {userSubscriptions.exam_attempts.total_attempts_allowed} Used
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Can Attempt Exams</p>
                        <p className={`font-medium ${
                          userSubscriptions.exam_attempts.can_attempt_exams ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {userSubscriptions.exam_attempts.can_attempt_exams ? 'Yes' : 'No'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800">No active subscription found. Purchase a plan to access exam attempts.</p>
                  </div>
                )}

                {/* Exam Attempts Summary */}
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Total Allowed</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {userSubscriptions.exam_attempts.total_attempts_allowed}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Used</p>
                    <p className="text-lg font-semibold text-orange-600">
                      {userSubscriptions.exam_attempts.total_used_attempts}
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Remaining</p>
                    <p className="text-lg font-semibold text-green-600">
                      {userSubscriptions.exam_attempts.total_remaining_attempts}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-xs text-gray-600">Total Transactions</p>
                    <p className="text-lg font-semibold text-gray-600">
                      {userSubscriptions.total_transactions}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Transaction History */}
            {userSubscriptions && userSubscriptions.transactions && userSubscriptions.transactions.length > 0 && (
              <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
                <div className="flex flex-col md:flex-row md:justify-between md:items-center border-b pb-4 mb-4">
                  <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
                  <span className="text-sm text-gray-600 mt-2 md:mt-0">
                    {userSubscriptions.successful_transactions}/{userSubscriptions.total_transactions} Successful
                  </span>
                </div>

                <table className="min-w-full w-full text-left text-sm text-gray-700">
                  <thead className="text-gray-600 bg-[#E8F0FE]">
                    <tr>
                      <th className="pl-4 py-3 rounded-tl-lg">Transaction ID</th>
                      <th className="text-center py-3">Plan</th>
                      <th className="text-center py-3">Amount</th>
                      <th className="text-center py-3">Date</th>
                      <th className="text-center py-3">Status</th>
                      <th className="text-center py-3 rounded-tr-lg">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userSubscriptions.transactions.map((transaction: Transaction, index: number) => (
                      <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                        <td className="pl-4 py-3 font-medium">#{transaction.id || `TXN-${index + 1}`}</td>
                        <td className="text-center py-3 text-gray-600">{transaction.plan_name || 'N/A'}</td>
                        <td className="text-center py-3 text-gray-600 font-medium">
                          Rs. {transaction.amount ? parseFloat(transaction.amount).toLocaleString() : 'N/A'}
                        </td>
                        <td className="text-center py-3 text-gray-600">
                          {transaction.created_at ? new Date(transaction.created_at).toLocaleDateString() : 'N/A'}
                        </td>
                        <td className={`text-center font-semibold py-3 ${getStatusColor(transaction.status || 'Unknown')}`}>
                          {transaction.status || 'Unknown'}
                        </td>
                        <td className="text-center py-3">
                          <button
                            className={`py-1.5 px-4 rounded-lg text-xs font-semibold text-white transition-colors ${
                              transaction.status === 'Failed' || transaction.status === 'Pending'
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                            disabled={transaction.status === 'Failed' || transaction.status === 'Pending'}
                          >
                            Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* No Transactions Message */}
            {userSubscriptions && (!userSubscriptions.transactions || userSubscriptions.transactions.length === 0) && (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No Transaction History</h3>
                <p className="text-gray-500">You haven't made any subscription purchases yet.</p>
              </div>
            )}

            {/* Information Section */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mt-6">
              <h3 className="font-semibold text-blue-800 mb-2">Subscription Information</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Each subscription includes multiple exam attempts as per the plan</li>
                <li>• Track your remaining attempts in the subscription status section</li>
                <li>• Failed transactions can be retried from your transaction history</li>
                <li>• Contact support if you encounter any payment issues</li>
                <li>• Receipts are available for download after successful payments</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentHistoryPage;
