import { useEffect, useState } from "react";
import { getClients } from "../application/getClients";
import type { Client } from "../domain/Client";
//import { LoadingSpinner } from "@/shared/ui/LoadingSpinner";
import { LoadingSpinner } from "../../../shared/ui/LoadingSpinner";

export const ClientList = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //getClients().then(setClients);
    getClients()
      .then(setClients)
      .finally(() => setLoading(false));
  }, []);

if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Client List</h1>
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
            <tr key={client.cli_num}>
              <td className="border p-2">{client.cli_num}</td>
              <td className="border p-2">{client.cli_id}</td>
              <td className="border p-2">{client.cli_razsoc}</td>
              <td className="border p-2">{client.cli_dir}</td>
              <td className="border p-2">{client.cli_tel}</td>
            </tr>
          ))} 
        </tbody>
      </table>
    </div>
  );
};