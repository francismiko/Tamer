import { useAuth } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SWRConfig } from 'swr';
import { Content } from './Content';
import { Loading } from './Loading';
import { Sidebar } from './Sidebar';

export function Layout(): JSX.Element {
  const { isLoaded, isSignedIn } = useAuth();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate('/signin');
    }
  }, [isSignedIn]);

  if (!isLoaded) {
    return (
      <div className="h-screen ">
        <Loading />
      </div>
    );
  }

  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(backendUrl + url).then((res) => res.json()),
      }}
    >
      <Sidebar />
      <Content>
        <Outlet />
      </Content>
    </SWRConfig>
  );
}
