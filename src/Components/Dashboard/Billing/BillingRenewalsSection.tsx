'use client';

import React, { useEffect, useMemo, useState } from 'react';
import {
  Calendar,
  Clock,
  CreditCard,
  CheckCircle,
  Crown,
  XCircle,
  AlertCircle,
  Download,
  ArrowRight
} from 'lucide-react';
import { getSchoolSubscriptionsByUserId, purchaseSubscription } from '../../../../services/schoolServices';

// TODO: Replace with an invoices API if/when available
const invoiceHistory = [
  { invoice: '#0045', amount: '₹ 2,400', status: 'Paid', date: '3 June 2025' },
  { invoice: '#0044', amount: '₹ 2,400', status: 'Paid', date: '3 June 2024' },
  { invoice: '#0043', amount: '₹ 2,400', status: 'Paid', date: '3 June 2023' },
  { invoice: '#0042', amount: '₹ 2,400', status: 'Paid', date: '3 June 2022' },
  { invoice: '#0041', amount: '₹ 2,400', status: 'Paid', date: '3 June 2021' },
  { invoice: '#0040', amount: '₹ 2,400', status: 'Paid', date: '3 June 2020' },
  { invoice: '#0039', amount: '₹ 2,400', status: 'Paid', date: '3 June 2019' },
];

function daysBetweenISO(from?: string, to?: string) {
  if (!from || !to) return 0;
  const a = new Date(from).getTime();
  const b = new Date(to).getTime();
  const days = Math.ceil((b - a) / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

function daysBetweenDates(a: Date, b: Date) {
  const days = Math.ceil((b.getTime() - a.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, days);
}

const SubscriptionAndBillingSection = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getSchoolSubscriptionsByUserId();
        if (res?.status && Array.isArray(res?.data) && res.data.length > 0) {
          setSubscription(res.data);
        } else if (res?.status && res?.data) {
          setSubscription(res.data);
        } else {
          setSubscription(null);
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscription();
  }, []);

  const handleSubscribe = async () => {
    const schoolId = subscription?.school_id;
    if (!schoolId) return;
    setSubscribing(true);
    try {
      const res = await purchaseSubscription(schoolId);
      setSubscription(Array.isArray(res?.data) ? (res.data || null) : res?.data || null);
    } catch (err) {
      console.error('Subscribe error:', err);
    } finally {
      setSubscribing(false);
    }
  };

  const meta = useMemo(() => {
    if (!subscription) {
      return { totalDays: 365, elapsedDays: 0, daysRemaining: 0, amountYear: 0 };
    }
    const { start_date, end_date, subscription_amount } = subscription || {};
    const totalDays = daysBetweenISO(start_date, end_date) || 365;
    const today = new Date();
    const elapsedDays = start_date ? Math.min(totalDays, daysBetweenDates(new Date(start_date), today)) : 0;
    const daysRemaining = end_date ? Math.max(0, daysBetweenDates(today, new Date(end_date))) : 0;
    const amountYear = parseInt(subscription_amount || '0', 10) || 0;
    return { totalDays, elapsedDays, daysRemaining, amountYear };
  }, [subscription]);

  const progressPercentage = meta.totalDays > 0 ? (meta.elapsedDays / meta.totalDays) * 100 : 0;

  if (loading) {
    return <p className="text-gray-600">Loading subscription details...</p>;
  }

  const paymentStatus: string | undefined = subscription?.payment_status;
  const schoolName: string | undefined = subscription?.school_name;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Subscription & Billing</h2>
        <p className="mt-1 text-gray-600">Manage the annual plan, payments, renewal, and view past invoices in one place.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Crown className="text-yellow-500" size={24} />
              {schoolName ? `${schoolName} • Current Subscription` : 'Current Subscription'}
            </h3>
            <p className="text-gray-600 mt-1">Premium School Listing Package</p>
          </div>
          <div>
            {paymentStatus === 'paid' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle size={16} className="mr-1" />
                Paid
              </span>
            )}
            {paymentStatus === 'pending' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                <AlertCircle size={16} className="mr-1" />
                Pending
              </span>
            )}
            {paymentStatus === 'failed' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <XCircle size={16} className="mr-1" />
                Failed
              </span>
            )}
            {!paymentStatus && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                No Plan
              </span>
            )}
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Billing Details */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">Billing Details</h2>
            <div className="mt-4 bg-white p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-800">Plan</span>
                  <span className="bg-green-100 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">Annual</span>
                </div>
                <span className="font-bold text-lg text-gray-800">₹ {meta.amountYear.toLocaleString()} per Year</span>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">
                  {meta.elapsedDays} Days out of {meta.totalDays}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }} />
                </div>
              </div>

              <div className="text-right">
                {paymentStatus === 'paid' ? (
                  <button className="inline-flex items-center gap-1 text-green-600 font-semibold text-sm hover:underline">
                    Renew Plan <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    onClick={handleSubscribe}
                    disabled={subscribing}
                    className="inline-flex items-center gap-2 text-green-600 font-semibold text-sm hover:underline disabled:opacity-50"
                  >
                    {subscribing ? 'Processing...' : 'Subscribe Now'} <ArrowRight size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Key Figures */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <CreditCard size={18} />
                <span className="text-sm font-medium">Amount</span>
              </div>
              <p className="text-lg font-bold text-green-600">₹{meta.amountYear.toLocaleString()}</p>
            </div>

            {paymentStatus === 'paid' && (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Start Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {subscription?.start_date ? new Date(subscription.start_date).toLocaleDateString() : '-'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Expiry Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {subscription?.end_date ? new Date(subscription.end_date).toLocaleDateString() : '-'}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock size={18} />
                    <span className="text-sm font-medium">Remaining Days</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">{meta.daysRemaining} Days</p>
                </div>
              </>
            )}
          </div>

          {/* Primary Action */}
          {paymentStatus === 'paid' && (
            <div className="mt-2 flex justify-center">
              <button className="px-8 py-3 bg-[#257B5A] text-white rounded-lg font-semibold hover:bg-[#1e6347] transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <CreditCard size={18} />
                Renew Annual Plan
              </button>
            </div>
          )}
          {(paymentStatus === 'pending' || paymentStatus === 'failed' || !paymentStatus) && (
            <div className="mt-2 flex justify-center">
              <button
                onClick={handleSubscribe}
                disabled={subscribing}
                className="px-8 py-3 bg-[#257B5A] text-white rounded-lg font-semibold hover:bg-[#1e6347] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2"
              >
                <CreditCard size={18} />
                {subscribing ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </div>
          )}

          {/* Billing History */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Billing History</h3>
            <div className="mt-4 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200">
                <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4">
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Invoice</div>
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Amount</div>
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Status</div>
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Date</div>
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wide text-right">Action</div>
                </div>
              </div>
              <div className="max-h-[400px] overflow-y-auto">
                {invoiceHistory.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-2 md:grid-cols-5 gap-4 px-6 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200 last:border-b-0"
                  >
                    <div className="font-medium text-gray-800 md:col-span-1">
                      <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Invoice:</span>
                      <span className="text-gray-700 font-mono">{item.invoice}</span>
                    </div>
                    <div className="text-gray-700 md:col-span-1">
                      <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Amount:</span>
                      <span className="font-semibold text-green-600">{item.amount}</span>
                    </div>
                    <div className="text-gray-500 md:col-span-1">
                      <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Status:</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </div>
                    <div className="text-gray-700 md:col-span-1">
                      <span className="md:hidden text-xs font-medium text-gray-500 block mb-1">Date:</span>
                      <span className="font-medium">{item.date}</span>
                    </div>
                    <div className="col-span-2 md:col-span-1 md:text-right">
                      <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                        <Download size={14} />
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* End Billing History */}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionAndBillingSection;
