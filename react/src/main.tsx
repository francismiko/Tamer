import { ClerkProvider } from '@clerk/clerk-react';
import { dark } from '@clerk/themes';
import '@style/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
    >
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>,
);
