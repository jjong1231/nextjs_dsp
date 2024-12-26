import React, { useEffect, useState } from "react";

interface settype {
  alertColor: string;
  alertMsg: string;
  alertClose: () => void;
}

const AlertColor = ({ alertColor, alertMsg, alertClose }: settype) => {
  // console.log(v);

  const [colorAlert, setColorAlert] = useState(
    "p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800 opacity-100 fixed top-1/4 left-1/2 transform -translate-x-1/2 w-2/3 z-50"
  );
  const [colorClose, setColorClose] = useState(
    "text-yellow-800 bg-transparent border border-yellow-800 hover:bg-yellow-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-yellow-300 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-gray-800 dark:focus:ring-yellow-800"
  );
  const [alertTitle, setAlertTitle] = useState("warning");

  useEffect(() => {
    switch (alertColor) {
      case "red":
        setAlertTitle("danger");
        setColorAlert(
          "p-4 mb-4 text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800 opacity-100 fixed top-1/4 left-1/2 transform -translate-x-1/2 w-2/3 z-50"
        );
        setColorClose(
          "text-red-800 bg-transparent border border-red-800 hover:bg-red-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-red-600 dark:border-red-600 dark:text-red-500 dark:hover:text-white dark:focus:ring-red-800"
        );
        break;
      case "green":
        setAlertTitle("success");
        setColorAlert(
          "p-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800 opacity-100 fixed top-1/4 left-1/2 transform -translate-x-1/2 w-2/3 z-50"
        );
        setColorClose(
          "text-green-800 bg-transparent border border-green-800 hover:bg-green-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-green-600 dark:border-green-600 dark:text-green-400 dark:hover:text-white dark:focus:ring-green-800"
        );
        break;
      default:
        setAlertTitle("warning");
        setColorAlert(
          "p-4 mb-4 text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-300 dark:border-yellow-800 opacity-100 fixed top-1/4 left-1/2 transform -translate-x-1/2 w-2/3 z-50"
        );
        break;
    }
  });

  return (
    <div className="fixed">
      <div className="fixed w-full h-full top-0 left-0 bg-slate-500 opacity-75 z-40"></div>
      <div id="alert-additional-content-2" className={colorAlert} role="alert">
        <div className="flex items-center">
          <svg
            className="flex-shrink-0 w-4 h-4 me-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <h3 className="text-lg font-medium">This is a {alertTitle} alert</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">{alertMsg}</div>
        <div className="flex justify-center items-center mt-8">
          <button
            type="button"
            className={colorClose}
            data-dismiss-target="#alert-additional-content-2"
            aria-label="Close"
            onClick={alertClose}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertColor;
