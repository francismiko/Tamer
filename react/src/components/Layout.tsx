import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidenav, initTE } from 'tw-elements';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): JSX.Element {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    initTE({ Sidenav });
  }, []);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/signin');
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status"
        />
      </div>
    );
  }

  return (
    <>
      <Sidebar />
      {children}
    </>
  );
}
