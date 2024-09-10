import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-4 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Open Source - No Right Reserved. Go Crazy. 🤪
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Powered by <span className="brand-text"><span>rUv</span></span>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/privacy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;