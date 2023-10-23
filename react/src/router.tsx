import { SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/dashboard/route';
import { Hero } from './pages/route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
  },
  {
    path: 'signin',
    element: <SignIn />,
  },
  {
    path: 'signout',
    element: <SignUp />,
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
