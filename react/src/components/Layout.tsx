import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignedIn) {
      navigate('/signin');
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
