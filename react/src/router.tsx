import { Layout } from '@/components/Layout';
import { Hero } from '@/pages/Hero';
import { Dashboard } from '@/pages/dashboard/route';
import { SignIn, SignUp } from '@clerk/clerk-react';
import { createBrowserRouter } from 'react-router-dom';
import { Conversation } from './pages/dashboard/conversation/route';

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
    path: '/dashboard',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'conversation/:id',
        element: <Conversation />,
      },
    ],
  },
]);
