import { SignIn, SignUp } from '@clerk/clerk-react';
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Chat } from './pages/dashboard/chat/route';
import { Dashboard } from './pages/dashboard/route';
import { Hero } from './pages/Hero';

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
    children: [
      {
        path: 'chat',
        element: (
          <Layout>
            <Chat />
          </Layout>
        ),
      },
    ],
  },
]);
