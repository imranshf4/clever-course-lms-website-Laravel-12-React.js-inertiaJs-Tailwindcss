import React from 'react'
import { FaHome, FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa';
import { CiFaceSmile } from 'react-icons/ci';
import { Link } from 'react-router';

export default function NotFound() {
  return (
    <>

      <div className="flex flex-col items-center justify-center  text-center min-h-screen space-y-5">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-red-100 rounded-full">
            <CiFaceSmile className="w-12 h-12 text-red-500" />
          </div>
        </div>

        {/* Title & Message */}
        <h1 className="text-4xl font-bold text-gray-900 mb-3">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</h2>
        <p className="text-gray-600 mb-6">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <FaHome className="w-5 h-5" />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Go Back
            <FaLongArrowAltRight className="w-5 h-5" />
            
          </button>
        </div>
      </div>
    </>
  );
}