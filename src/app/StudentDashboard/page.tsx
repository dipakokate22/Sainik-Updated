'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboardPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to dashboard by default
    router.push('/StudentDashboard/dashboard');
  }, [router]);

  return null;
}