import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from '@clerk/clerk-react';
import React from 'react';
import { Link } from 'react-router-dom';

export function Hero(): JSX.Element {
  return (
    <>
      <section className="mb-40">
        <nav
          className="relative flex w-full flex-nowrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start lg:py-4"
          data-te-navbar-ref
        >
          <div className="flex w-full flex-wrap items-center justify-between px-3">
            <div
              className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
              id="navbarSupportedContent7"
              data-te-collapse-item
            >
              <ul
                className="list-style-none ml-auto flex flex-col pl-0 lg:mt-1 lg:flex-row"
                data-te-navbar-nav-ref
              >
                <li
                  className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <Link
                    className="block py-2 pr-2 text-neutral-500 transition duration-150 ease-in-out hover:text-neutral-600 focus:text-neutral-600 disabled:text-black/30 dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300 dark:disabled:text-white/30 lg:px-2 [&.active]:text-black/80 dark:[&.active]:text-white/80"
                    to="/dashboard"
                    data-te-nav-link-ref
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    Dashboard
                  </Link>
                </li>
                <li
                  className="mb-4 pl-2 lg:mb-0 lg:pl-0 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <SignedIn>
                    <SignOutButton>
                      <button
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Sign Out
                      </button>
                    </SignOutButton>
                  </SignedIn>
                  <SignedOut>
                    <SignInButton>
                      <button
                        type="button"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                        className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                      >
                        Sign In
                      </button>
                    </SignInButton>
                  </SignedOut>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="bg-neutral-50 py-24 px-6 text-center dark:bg-neutral-900">
          <h1 className="mt-2 mb-16 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
            Your own English
            <br />
            <span className="text-primary">self-learning platform</span>
          </h1>
        </div>
      </section>
    </>
  );
}
