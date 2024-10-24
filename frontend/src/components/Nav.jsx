import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const Nav = () => {
  const { token, updateToken } = useContext(UserContext);

  const logoutHandler = () => {
    updateToken(null); 
  };

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="Flowbite Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            E-Commerce
          </span>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="font-medium block py-2 px-3 text-white bg-teal-700 rounded md:bg-transparent md:text-teal-700 md:p-0 dark:text-white md:dark:text-teal-500"
              >
                Home
              </Link>
            </li>
            {token ? (
              <>
                <li>
                  <Link
                    to="/create/product"
                    className="font-medium block py-2 px-3 text-teal-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 dark:text-white md:dark:hover:text-teal-500"
                  >
                    Create
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="font-medium block py-2 px-3 text-teal-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 dark:text-white md:dark:hover:text-teal-500"
                    onClick={logoutHandler}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/login"
                    className="font-medium block py-2 px-3 text-teal-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 dark:text-white md:dark:hover:text-teal-500"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    to="/register"
                    className="font-medium block py-2 px-3 text-teal-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 dark:text-white md:dark:hover:text-teal-500"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
            <li>
              <Link
                to="/contact"
                className="font-medium block py-2 px-3 text-teal-600 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-teal-700 dark:text-white md:dark:hover:text-teal-500"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {token && token.user_mail && (
        <p className="text-right text-sm text-teal-600">
          <span className="font-semibold">Logged in as</span> {token.user_mail}
        </p>
      )}
    </nav>
  );
};

export default Nav;
