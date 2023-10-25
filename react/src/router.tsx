import { SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Hero } from './pages/Hero';
import { Dashboard } from './pages/dashboard/route';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Hero />,
  },
  {
    path: '/signin',
    element: (
      <div className="flex items-center justify-center h-screen">
        <SignIn />
      </div>
    ),
  },
  {
    path: '/signup',
    element: (
      <div className="flex items-center justify-center h-screen">
        <SignUp />
      </div>
    ),
  },
  {
    element: <Layout />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);
