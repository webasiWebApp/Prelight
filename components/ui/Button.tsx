"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({ onClick, children, className = "" }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`relative group border-none bg-transparent p-0 outline-none cursor-pointer font-sans font-semibold uppercase text-xs ${className}`}
    >
      <span className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25 rounded transform translate-y-0.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:translate-y-1 group-hover:duration-[250ms] group-active:translate-y-px" />

      <span className="absolute top-0 left-0 w-full h-full rounded bg-gradient-to-l from-blue-700 via-purple-600 to-blue-700" />

      <div className="relative flex items-center justify-between py-1.5 px-4 text-xs text-white rounded transform -translate-y-1 bg-gradient-to-r from-blue-500 to-purple-500 gap-1.5 transition duration-[600ms] ease-[cubic-bezier(0.3,0.7,0.4,1)] group-hover:-translate-y-1.5 group-hover:duration-[250ms] group-active:-translate-y-0.5 brightness-100 group-hover:brightness-110">
        <span className="select-none">{children}</span>

        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3.5 h-3.5 ml-1 -mr-0.5 transition duration-250 group-hover:translate-x-1"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            fillRule="evenodd"
          />
        </svg>
      </div>
    </button>
  );
}
