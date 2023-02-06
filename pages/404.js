import React from "react";
import Link from "next/link";

const FourOhFour = () => (
  <>
    <div className="bg-gradient-to-r from-slate-700 to-zinc-700">
      <div className="w-9/12 m-auto py-16 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg pb-8">
          <div className="border-t border-gray-200 text-center pt-8">
            <h1 className="text-6xl sm:text-9xl font-bold text-slate-700">
              404
            </h1>
            <h1 className="text-2xl sm:text-6xl font-medium py-8 md:px-4">
              oops! Page not found
            </h1>
            <p className="text-md pb-8 px-12 font-medium">
              Oops! The page you are looking for does not exist. It might have
              <br />
              been moved or deleted.
            </p>
            <Link
              href="/"
              className="bg-slate-500 hover:bg-stone-500 text-white font-semibold px-8 py-4 rounded-md mr-6 uppercase"
            >
              home
            </Link>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default FourOhFour;
