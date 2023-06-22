import React, { useEffect } from "react";
import { Icon } from "@iconify/react";

export default function Modal({ showModal, setShowModal, children }) {
  useEffect(() => {
    const closeModalOnOutsideClick = (event) => {
      if (event.target.id === "modal") {
        setShowModal(false);
      }
    };

    if (showModal) {
      window.addEventListener("click", closeModalOnOutsideClick);
    }

    return () => {
      window.removeEventListener("click", closeModalOnOutsideClick);
    };
  }, [showModal, setShowModal]);

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-30 flex items-end bg-opacity-50 sm:items-center sm:justify-center">
          <div
            className="w-full px-6 py-1 overflow-hidden bg-slate-100 rounded-t-lg sm:rounded-lg sm:m-4 sm:max-w-xl sm:mx-auto overflow-y-auto max-h-screen"
            role="dialog"
            id="modal"
          >
            {/* Modal header */}
            <header className="flex justify-end">
              <button
                className="ml-auto mt-2 bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
              >
                <Icon icon={"material-symbols:close"} />
              </button>
            </header>

            {/* Modal body */}
            <div className="mt-6 mb-6 ">
              <div className="text-sm text-gray-700">{children}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
