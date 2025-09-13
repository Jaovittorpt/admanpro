import * as React from 'react';

export const Logo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width="160"
    height="32"
    viewBox="0 0 160 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="32" height="32" rx="8" fill="hsl(var(--primary))" />
    <path
      d="M10.826 21.75V10.25H13.626L18.866 18.03V10.25H21.17V21.75H18.37L13.13 13.97V21.75H10.826Z"
      fill="hsl(var(--primary-foreground))"
    />
    <text
      x="40"
      y="23"
      fontFamily="Belleza"
      fontSize="24"
      fill="hsl(var(--foreground))"
    >
      AdMan Pro
    </text>
  </svg>
);
