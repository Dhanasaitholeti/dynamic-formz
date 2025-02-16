import React from "react";

export default function Home() {
  return (
    <div className="bg-white flex-1 flex flex-col">
      <div className="relative isolate flex-1 flex flex-col">
        <div className="mx-auto max-w-7xl px-6 flex-1 flex flex-col justify-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Build Dynamic Forms with Ease
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Create, customize, and deploy professional forms in minutes. No
              coding required. Perfect for surveys, applications, and data
              collection.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="rounded-md bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                Get Started
              </button>
              <button className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 top-[calc(100%-80rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-60rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-blue-200 to-blue-400 opacity-20 sm:w-[72.1875rem]" />
        </div>
      </div>
    </div>
  );
}
