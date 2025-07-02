import { useEffect, useState } from "react";
import { getClients } from "../application/getClients";
import type { Client } from "../domain/Client";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";
import type { ApiResponse } from "../../../shared/types/ApiResponse";
import { ClientFormModal } from "./ClientFormModal";


export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    getClients()
      .then((res: ApiResponse<Client[]>) => {
        if (res.code === 200 && res.data) {
          setClients(res.data);
        } else {
          setError(res.message || "Error inesperado");
        }
      })
      .catch(() => {
        setError("🔌 No hay conexión con el servidor.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-red-600 text-center mt-4">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Client List</h1>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Client List</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowForm(true)}
        >
          + Agregar Cliente
        </button>
      </div>
      <table className="w-full table-auto border">
        <thead>
          <tr>
            <th className="border p-2">#</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Address</th>
            <th className="border p-2">Phone</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.sequence}>
              <td className="border p-2">{client.sequence}</td>
              <td className="border p-2">{client.id}</td>
              <td className="border p-2">{client.razon_social}</td>
              <td className="border p-2">{client.address}</td>
              <td className="border p-2">{client.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showForm && (
        <ClientFormModal
          onClose={() => setShowForm(false)}
          onSuccess={(newClient) => {
            setClients([...clients, newClient]);
          }}
        />
      )}
    </div>
  );
};