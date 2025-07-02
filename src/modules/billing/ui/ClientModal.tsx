import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { Client } from "../../client/domain/Client";
import { useEffect, useRef } from "react";

interface ClientModalProps {
  onSelect: (client: Client) => void;
  onClose: () => void;
}

export const ClientModal = ({ onSelect, onClose }: ClientModalProps) => {
  const clientes = useSelector((state: RootState) => state.clientes.clientes);
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // Se cierra al hacer clic fuera
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-4/5 max-w-2xl p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seleccionar Cliente</h2>
          <button onClick={onClose} className="text-red-600 font-bold">✕</button>
        </div>
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">Nombre</th>
              <th className="border p-2">Dirección</th>
              <th className="border p-2">Teléfono</th>
              <th className="border p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cli) => (
              <tr key={cli.sequence}>
                <td className="border p-2">{cli.id}</td>
                <td className="border p-2">{cli.razon_social}</td>
                <td className="border p-2">{cli.address}</td>
                <td className="border p-2">{cli.phone}</td>
                <td className="border p-2">
                  <button
                    onClick={() => onSelect(cli)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Seleccionar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};