import { ClerkProvider } from '@clerk/clerk-react';
import '@style/index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/dashboard/route';
import { Hero } from './pages/route';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
  },
  {
    path: 'dashboard',
    element: (
      <Layout>
        <Dashboard />
      </Layout>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
);
