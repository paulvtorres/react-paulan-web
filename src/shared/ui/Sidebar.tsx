import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [ventasOpen, setVentasOpen] = useState(false);
  const location = useLocation();

  const handleNavClick = () => {
    setOpen(false); // Auto-colapsar cuando se selecciona una opción
    setVentasOpen(false); // Colapsar submenús también
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-2 bg-gray-700 hover:bg-gray-600 text-left"
      >
        {open ? "✕" : "☰"}
      </button>

      <nav className="mt-4">
        <ul>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/clients/list" onClick={handleNavClick}>
              {open ? "Clientes" : "👤"}
            </Link>
          </li>
          <li className="p-2 hover:bg-gray-700">
            <Link to="/items" onClick={handleNavClick}>
              {open ? "Ítems" : "📦"}
            </Link>
          </li>

          {/* Ventas con submenú */}
          <li className="p-2 hover:bg-gray-700 cursor-pointer">
            <div
              onClick={() => setVentasOpen(!ventasOpen)}
              className="flex justify-between items-center"
            >
              <span>{open ? "Ventas" : "💰"}</span>
              {open && <span>{ventasOpen ? "▾" : "▸"}</span>}
            </div>
            {ventasOpen && open && (
              <ul className="ml-4 mt-2 space-y-1 text-sm">
                <li>
                  <Link
                    to="/invoices"
                    className={`block p-2 rounded hover:bg-gray-700 ${
                      location.pathname === "/invoices" ? "bg-gray-700" : ""
                    }`}
                    onClick={handleNavClick}
                  >
                    Factura
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ventas/nota"
                    className="block p-2 rounded hover:bg-gray-700"
                    onClick={handleNavClick}
                  >
                    Nota de Venta
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ventas/devolucion"
                    className="block p-2 rounded hover:bg-gray-700"
                    onClick={handleNavClick}
                  >
                    Devolución
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};
