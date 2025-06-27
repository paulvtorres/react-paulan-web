import { useState } from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);

  return (
    <div className={`bg-gray-800 text-white h-full transition-all duration-300 ${open ? "w-64" : "w-16"}`}>
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-2 bg-gray-700 hover:bg-gray-600"
      >
        {open ? "✕" : "☰"}
      </button>
      <nav className="mt-4">
        <ul>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/clients/list">Clients</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/items">Items</Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/invoices">Invoices</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
