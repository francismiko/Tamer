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
    element: <SignIn />,
  },
  {
    path: '/signout',
    element: <SignUp />,
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
