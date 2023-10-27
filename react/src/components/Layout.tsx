import { Loading } from '@/components/Loading';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { SWRConfig } from 'swr';

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
      <main className="h-screen ">
        <Loading />
      </main>
    );
  }

  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(backendUrl + url).then((res) => res.json()),
      }}
    >
      <Sidebar />
      <main className="px-8 !pl-64 h-screen overflow-auto">
        <Outlet />
      </main>
    </SWRConfig>
  );
}
