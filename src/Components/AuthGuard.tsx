"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isAuthenticated } from "../../services/authServices";

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const authStatus = isAuthenticated();
    setIsAuth(authStatus);
    
    if (!authStatus) {
      router.push("/login");
    }
  }, [router]);

  // Prevent hydration mismatch by not rendering anything until client-side
  if (!isClient) {
    return <>{children}</>; // Render children on server to match initial HTML
  }

  // Only render children if authenticated on client
  if (!isAuth) {
    return null;
  }

  return <>{children}</>;
}