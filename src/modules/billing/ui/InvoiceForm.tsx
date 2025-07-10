import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { Client } from "../../client/domain/Client";
import type { Item } from "../../item/domain/Item";
import { ClientModal } from "./ClientModal";
import { ItemModal } from "./ItemModal";
//import { calculateIva } from "@/shared/calculates/calculateIva";
import { calculateIva } from "../../../shared/calculates/calculateIva";
import type { InvoiceItem, IvaGroupSummary } from "../domain/invoice";
import { InvoicePreviewModal } from "./InvoicePreviewModal";


export const InvoiceForm = () => {
  const clientes = useSelector((state: RootState) => state.clientes.clientes);
  const items = useSelector((state: RootState) => state.items.items);

  const [clientId, setClientId] = useState("");
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showClientModal, setShowClientModal] = useState(false);

  const [invoiceItems, setInvoiceItems] = useState<InvoiceItem[]>([]);
  const [showItemModalIndex, setShowItemModalIndex] = useState<number | null>(null);

  const [resumenPorIva, setResumenPorIva] = useState<Record<string, IvaGroupSummary>>({})
  const [showInvoicePreviewModal, setShowInvoicePreviewModal] = useState(false);
  
  let clientString = "";

  const handleClientSearch = () => {
    const found = clientes.find((c) => c.id === clientId);
    if (found) setSelectedClient(found);
    else setSelectedClient(null);
  };



  function calcularTotalesPorIva(items: InvoiceItem[]): Record<string, IvaGroupSummary> {
    const resumen: Record<string, IvaGroupSummary> = {};
    for (const item of items) {
      const key = item.iva_descripcion;
      const base = item.subtotal;
      const iva = parseFloat((base * (item.iva_percentage / 100)).toFixed(2));

      if (!resumen[key]) {
        resumen[key] = { base: 0, iva: 0, total: 0 };
      }

      resumen[key].base += base;
      resumen[key].iva += iva;
      resumen[key].total += base + iva;
    }

    // Redondeo final (por buena práctica)
    for (const key in resumen) {
      resumen[key].base = parseFloat(resumen[key].base.toFixed(2));
      resumen[key].iva = parseFloat(resumen[key].iva.toFixed(2));
      resumen[key].total = parseFloat(resumen[key].total.toFixed(2));
    }

    return resumen;
  }


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
            iva_code: item.iva_code,
            iva_percentage: item.iva_percentage,
            iva_descripcion: item.iva_descripcion,
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
      iva_code: item.iva_code,
      iva_percentage: item.iva_percentage,
      iva_descripcion: item.iva_descripcion,
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
  const iva = invoiceItems.reduce((sum, row) => sum + calculateIva(row.subtotal, row.iva_percentage), 0);
  const total = subTotal + iva

  useEffect(() => {
    setResumenPorIva(calcularTotalesPorIva(invoiceItems));
  }, [invoiceItems]
  )

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4 text-center md:text-left">
        Factura (Secuencia #1)
      </h2>

      {/* Cliente */}
      <div className="mb-4">
        <label className="block font-medium">Cliente ID</label>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            className="border p-2 w-full sm:w-80"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            onBlur={handleClientSearch}
          />
          <button
            onClick={() => setShowClientModal(true)}
            className="bg-gray-300 px-4 py-2 rounded w-full sm:w-auto"
          >
            Buscar Cliente
          </button>
        </div>
        {selectedClient && (
          <div className="mt-2 text-sm text-gray-600">
              <strong>{selectedClient.razon_social}</strong> - {selectedClient.address} -{" "}
              {selectedClient.phone}
          </div>
        )}
      </div>

      {/* Ítems - scroll en pantallas pequeñas */}
      <div className="overflow-x-auto">
        <table className="w-full border mt-4 min-w-[640px]">
          <thead>
            <tr className="bg-gray-100 text-sm">
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
              <tr key={index} className="text-sm">
                <td className="border p-2">
                  <input
                    value={row.code || ""}
                    onChange={(e) => handleItemCodeChange(index, e.target.value)}
                    className="w-full border px-2 py-1"
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
                    className="w-full border px-2 py-1"
                  />
                </td>
                <td className="border p-2 text-right">{row.iva_percentage.toFixed(2)}</td>
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
      </div>

      {/* Agregar ítem */}
      <div className="mt-4">
        <button
          onClick={() =>
            setInvoiceItems((prev) => [
              ...prev,
              {
                sequence: 0,
                code: "",
                description: "",
                pvp: 0,
                quantity: 1,
                iva_code: 0,
                iva_percentage: 0,
                iva_descripcion: "",
                subtotal: 0,
              },
            ])
          }
          className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Agregar ítem
        </button>
      </div>

      {/* Totales */}
      <div className="mt-6 space-y-2 text-center md:text-right font-bold text-lg">
        <div>Total: ${total.toFixed(2)}</div>
        <div>SubTotal: ${subTotal.toFixed(2)}</div>
        {/* <div>IVA: ${iva.toFixed(2)}</div> */}
        {/* {Object.entries(resumenPorIva).map(([iva, { base, iva: ivaVal, total }]) => ( */}
        {Object.entries(resumenPorIva).map(([key, { iva: ivaVal }]) => (
          <div key={key} style={{ marginBottom: '8px' }}>
            <div>{key}: ${ivaVal.toFixed(2)}</div>
            {/*   <strong>{key}</strong><br />
         Base: ${base.toFixed(2)}<br /> 
            IVA: ${ivaVal.toFixed(2)}<br />
             Total con IVA: ${total.toFixed(2)} */}
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        <button
          onClick={() => setShowInvoicePreviewModal(true)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Vista previa
        </button>
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

      {showInvoicePreviewModal && (
        <InvoicePreviewModal
          onClose={() => setShowInvoicePreviewModal(false)}
          invoiceItems= {invoiceItems}
          clientString= {selectedClient ? `${selectedClient.id} - ${selectedClient.razon_social}` : ""}
        />
      )}
    </div>
  );
};

