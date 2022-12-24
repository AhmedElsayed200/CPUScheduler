import React, { useState } from "react";
import "../../styles/tailwind.css"; // Import the Tailwind CSS styles

function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("FCFS - NP");

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  function handleMenuItemClick(item) {
    setSelectedItem(item);
    toggleMenu();
  }

  return (
    <div className="relative inline-block text-left">
      <button className="ml-8 block" onClick={toggleMenu}>
        {selectedItem}
      </button>
      {isOpen && (
        <ul className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg">
          <li className="py-2 hover:bg-gray-100">
            <a
              href="#"
              onClick={() => handleMenuItemClick("FCFS - NP")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              FCFS - NP
            </a>
          </li>
          <li className="py-2 hover:bg-gray-100">
            <a
              href="#"
              onClick={() => handleMenuItemClick("SJF - NP")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              SJF - NP
            </a>
          </li>
          <li className="py-2 hover:bg-gray-100">
            <a
              href="#"
              onClick={() => handleMenuItemClick("SJF - P")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              SJF - P
            </a>
          </li>
          <li className="py-2 hover:bg-gray-100">
            <a
              href="#"
              onClick={() => handleMenuItemClick("LJF - NP")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              LJF - NP
            </a>
          </li>
          <li className="py-2 hover:bg-gray-100">
            <a
              href="#"
              onClick={() => handleMenuItemClick("Priority - NP")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              Priority - NP
            </a>
          </li>
          <li className="py-2 hover:bg-gray-100">
            <a
              href="#"
              onClick={() => handleMenuItemClick("Round Robin - P")}
              className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out"
            >
              Round Robin - P
            </a>
          </li>
        </ul>
      )}
    </div>
  );
}

export default DropdownMenu;
