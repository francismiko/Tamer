import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Collapse, Ripple, initTE } from 'tw-elements';

export function Hero(): JSX.Element {
  useEffect(() => {
    initTE({ Ripple, Collapse });
  }, []);

  return (
    <>
      <section className="mb-40">
        <nav
          className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-700 lg:py-4"
          data-te-navbar-ref
        >
          <div className="flex flex-wrap items-center justify-between w-full px-3">
            <div>
              <img
                className="mr-2"
                src="https://tecdn.b-cdn.net/img/logo/te-transparent-noshadows.webp"
                style={{ height: '20px' }}
                alt="TE Logo"
                loading="lazy"
              />
            </div>
            {/* <!-- Hamburger button for mobile view --> */}
            <button
              className="block px-2 bg-transparent border-0 text-neutral-500 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden"
              type="button"
              data-te-collapse-init
              data-te-target="#navbarSupportedContent4"
              aria-controls="navbarSupportedContent4"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="[&>svg]:w-7">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-7 w-7"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>

            {/* <!-- Collapsible navbar container --> */}
            <div
              className="!visible mt-2 hidden flex-grow basis-[100%] items-center lg:mt-0 lg:!flex lg:basis-auto"
              id="navbarSupportedContent4"
              data-te-collapse-item
            >
              <ul
                className="flex flex-col pl-0 mr-auto list-style-none lg:mt-0 lg:flex-row"
                data-te-navbar-nav-ref
              >
                <li
                  className="pl-2 my-4 lg:my-0 lg:pl-2 lg:pr-1"
                  data-te-nav-item-ref
                >
                  <Link
                    to="/dashboard"
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-600 hover:text-primary-500 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
              <div className="flex items-center">
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <Link
                    to="/dashboard"
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                    className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Sign In
                  </Link>
                </SignedOut>
                <button
                  type="button"
                  data-te-ripple-init
                  data-te-ripple-color="light"
                  className="ml-3 mr-3 inline-block rounded px-3 py-2.5 text-xs font-medium uppercase leading-normal text-white shadow-md transition duration-150 ease-in-out hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg motion-reduce:transition-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>
        <div className="px-6 py-24 text-center bg-neutral-50 dark:bg-neutral-900">
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
