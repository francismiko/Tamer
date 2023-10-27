import React from 'react';

interface LoadingProps {
  size?: string;
}

export function Loading({ size = 'xl' }: LoadingProps): JSX.Element {
  const sizeStyles: { [key: string]: string } = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8',
  };

  const sizeStyle = sizeStyles[size];

  return (
    <div className="flex items-center justify-center h-full">
      <div
        className={`inline-block ${sizeStyle} animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-info motion-reduce:animate-[spin_1.5s_linear_infinite]`}
        role="status"
      />
    </div>
  );
}
