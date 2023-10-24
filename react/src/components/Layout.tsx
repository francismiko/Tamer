import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Sidenav, initTE } from 'tw-elements';
import { Content } from './Content';
import { Loading } from './Loading';
import { Sidebar } from './Sidebar';

export function Layout(): JSX.Element {
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
      <Content>
        <Outlet />
      </Content>
    </>
  );
}
