import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { Client } from "../../client/domain/Client";
import type { Item } from "../../item/domain/Item";
import { ClientModal } from "./ClientModal";
import { ItemModal } from "./ItemModal";

interface InvoiceItem {
  sequence: number;
  code: string;
  description: string;
  pvp: number;
  quantity: number;
  iva: number;
  subtotal: number;
}

export const InvoiceForm = () => {
  const clientes = useSelector((state: RootState) => state.clientes.clientes);
  const items = useSelector((state: RootState) => state.items.items);

  const [clientId, setClientId] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [showItemModalIndex, setShowItemModalIndex] = useState<number | null>(null);

  const handleClientSearch = () => {
    const found = clientes.find((c) => c.id === clientId);
    if (found) setSelectedClient(found);
    else setSelectedClient(null);
  };

  const handleItemCodeChange = (index: number, code: string) => {
    const item = items.find((itm) => itm.code === code);
    setInvoiceItems((prev) =>
      prev.map((row, i) =>
        i === index && item
          ? {
              ...row,
              sequence: item.sequence,
              code: item.code,
              description: item.description,
              pvp: item.pvp,
              subtotal: item.pvp * row.quantity,
            }
          : row
      )
    );
  };

  const handleQuantityChange = (index: number, quantity: number) => {
    setInvoiceItems((prev) =>
      prev.map((row, i) =>
        i === index
          ? {
              ...row,
              quantity,
              subtotal: row.pvp * quantity,
            }
          : row
      )
    );
  };

  const handleSelectClient = (client: Client) => {
    setSelectedClient(client);
    setClientId(client.id);
    setShowClientModal(false);
  };

  const handleSelectItem = (index: number, item: Item) => {
    const newItem: InvoiceItem = {
      sequence: item.sequence,
      code: item.code,
      description: item.description,
      pvp: item.pvp,
      quantity: 1,
      iva: 14,
      subtotal: item.pvp,
    };

    setInvoiceItems((prev) => {
      const copy = [...prev];
      copy[index] = newItem;
      return copy;
    });
    setShowItemModalIndex(null);
  };

  const subTotal = invoiceItems.reduce((sum, row) => sum + row.subtotal, 0);
  const iva = invoiceItems.reduce((sum, row) => sum + row.iva, 0);
  const total = subTotal + iva

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Factura (Secuencia #1)</h2>

      {/* Cliente */}
      <div className="mb-4">
        <label className="block font-medium">Cliente ID</label>
        <div className="flex items-center gap-2">
          <input
            className="border p-2 w-full"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            onBlur={handleClientSearch}
          />
          <button
            onClick={() => setShowClientModal(true)}
            className="bg-gray-300 px-3 py-2 rounded"
          >
            ...
          </button>
        </div>
        {selectedClient && (
          <div className="mt-2 text-sm text-gray-600">
            <strong>{selectedClient.razon_social}</strong> - {selectedClient.address} -{" "}
            {selectedClient.phone}
          </div>
        )}
      </div>

      {/* Ítems */}
      <table className="w-full border mt-4">
        <thead>
          <tr>
            <th className="border p-2">Código</th>
            <th className="border p-2">Descripción</th>
            <th className="border p-2">PVP</th>
            <th className="border p-2">Cantidad</th>
            <th className="border p-2">IVA</th>
            <th className="border p-2">Subtotal</th>
            <th className="border p-2">Buscar</th>
          </tr>
        </thead>
        <tbody>
          {invoiceItems.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">
                <input
                  // type="string"
                  value={row.code || ""}
                  onChange={(e) =>
                    handleItemCodeChange(index, e.target.value)
                  }
                  className="w-full border"
                />
              </td>
              <td className="border p-2">{row.description}</td>
              <td className="border p-2 text-right">{row.pvp.toFixed(2)}</td>
              <td className="border p-2">
                <input
                  type="number"
                  value={row.quantity}
                  onChange={(e) =>
                    handleQuantityChange(index, parseInt(e.target.value, 10))
                  }
                  className="w-full border"
                />
              </td>
              <td className="border p-2 text-right">{14}</td>
              <td className="border p-2 text-right">{row.subtotal.toFixed(2)}</td>
              <td className="border p-2 text-center">
                <button
                  onClick={() => setShowItemModalIndex(index)}
                  className="bg-gray-300 px-2 py-1 rounded"
                >
                  ...
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Agregar línea */}
      <button
        onClick={() =>
          setInvoiceItems((prev) => [
            ...prev,
            { sequence: 0, code: "", description: "", pvp: 0, quantity: 1, iva:0, subtotal: 0 },
          ])
        }
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        + Agregar ítem
      </button>

      <div className="mt-4 text-right font-bold text-lg">
        Total: ${total.toFixed(2)}
      </div>  
      <div className="mt-4 text-right font-bold text-lg">
        SubTotal: ${subTotal.toFixed(2)}
      </div>  
      <div className="mt-4 text-right font-bold text-lg">
        IVA: ${iva.toFixed(2)}
      </div>

      {/* Modales */}
      {showClientModal && (
        <ClientModal
          onSelect={handleSelectClient}
          onClose={() => setShowClientModal(false)}
        />
      )}

      {showItemModalIndex !== null && (
        <ItemModal
          onSelect={(item) => handleSelectItem(showItemModalIndex, item)}
          onClose={() => setShowItemModalIndex(null)}
        />
      )}
    </div>
  );
};