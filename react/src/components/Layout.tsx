import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidenav, initTE } from 'tw-elements';
import { Loading } from './Loading';
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
    return <Loading />;
  }

  return (
    <>
      <Sidebar />
      <main>{children}</main>
    </>
  );
}
