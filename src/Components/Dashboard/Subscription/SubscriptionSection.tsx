'use client';

import React, { useEffect, useState } from 'react';
import { Calendar, Clock, CreditCard, CheckCircle, Crown, XCircle, AlertCircle } from 'lucide-react';
import { getSchoolSubscriptionsByUserId, purchaseSubscription } from '../../../../services/schoolServices';

const SubscriptionSection = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await getSchoolSubscriptionsByUserId();
        if (res.status && res.data.length > 0) {
          setSubscription(res.data[0]);
        }
      } catch (err) {
        console.error('Error fetching subscription:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSubscription();
  }, []);

  const calculateDaysRemaining = (endDate: string) => {
    const today = new Date();
    const expiry = new Date(endDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const handleSubscribe = async () => {
    if (!subscription?.school_id) return;
    setSubscribing(true);
    try {
      const res = await purchaseSubscription(subscription.school_id);
      console.log('Subscription purchased:', res);
      // reload subscription
      setSubscription(res.data[0] || res.data);
    } catch (err) {
      console.error('Subscribe error:', err);
    } finally {
      setSubscribing(false);
    }
  };

  if (loading) {
    return <p className="text-gray-600">Loading subscription details...</p>;
  }

  if (!subscription) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
        <Crown className="mx-auto text-yellow-500 mb-4" size={48} />
        <h3 className="text-2xl font-bold text-gray-800">No Subscription Found</h3>
        <p className="text-gray-600 mt-2">Subscribe to unlock premium features for your school.</p>
        <button
          onClick={handleSubscribe}
          disabled={subscribing}
          className="mt-6 px-8 py-3 bg-[#257B5A] text-white rounded-lg font-semibold hover:bg-[#1e6347] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
        >
          {subscribing ? 'Subscribing...' : 'Subscribe Now'}
        </button>
      </div>
    );
  }

  const { start_date, end_date, subscription_amount, payment_status } = subscription;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-800">Subscription Management</h2>
        <p className="mt-1 text-gray-600">Manage your annual subscription plan and payment status.</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Crown className="text-yellow-500" size={24} />
              Current Subscription
            </h3>
            <p className="text-gray-600 mt-1">Premium School Listing Package</p>
          </div>
          <div>
            {payment_status === 'paid' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                <CheckCircle size={16} className="mr-1" />
                Paid
              </span>
            )}
            {payment_status === 'pending' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
                <AlertCircle size={16} className="mr-1" />
                Pending
              </span>
            )}
            {payment_status === 'failed' && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
                <XCircle size={16} className="mr-1" />
                Failed
              </span>
            )}
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Always show Amount */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <CreditCard size={18} />
                <span className="text-sm font-medium">Amount</span>
              </div>
              <p className="text-lg font-bold text-green-600">₹{parseInt(subscription_amount).toLocaleString()}</p>
            </div>

            {/* Show more details only if Paid */}
            {payment_status === 'paid' && (
              <>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Start Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(start_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Calendar size={18} />
                    <span className="text-sm font-medium">Expiry Date</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">
                    {new Date(end_date).toLocaleDateString()}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Clock size={18} />
                    <span className="text-sm font-medium">Remaining Days</span>
                  </div>
                  <p className="text-lg font-bold text-blue-600">
                    {calculateDaysRemaining(end_date)} Days
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Renew button - only for Paid */}
          {payment_status === 'paid' && (
            <div className="mt-8 flex justify-center">
              <button className="px-8 py-3 bg-[#257B5A] text-white rounded-lg font-semibold hover:bg-[#1e6347] transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                <CreditCard size={18} />
                Renew Annual Plan
              </button>
            </div>
          )}

          {/* Subscribe button - for Pending or Failed */}
          {(payment_status === 'pending' || payment_status === 'failed') && (
            <div className="mt-8 flex justify-center">
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
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
