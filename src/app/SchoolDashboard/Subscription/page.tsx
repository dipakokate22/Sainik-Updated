// src/app/dashboard/subscription/page.tsx

import React from 'react';
import SubscriptionSection from '@/Components/Dashboard/Subscription/SubscriptionSection';

const SubscriptionPage = () => {
  return (
    // The main dashboard layout will provide the outer structure and padding.
    // We just need to render our specific section component here.
    <SubscriptionSection />
  );
};

export default SubscriptionPage;