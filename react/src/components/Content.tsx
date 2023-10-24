import React from 'react';

interface ContentProps {
  children: React.ReactNode;
}

export function Content({ children }: ContentProps): JSX.Element {
  return <div className="px-8 !pl-64 h-screen overflow-auto">{children}</div>;
}
