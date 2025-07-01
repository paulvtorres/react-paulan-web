import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import type { Item } from "../../item/domain/Item";

interface ItemModalProps {
  onSelect: (item: Item) => void;
  onClose: () => void;
}

export const ItemModal = ({ onSelect, onClose }: ItemModalProps) => {
  const items = useSelector((state: RootState) => state.items.items);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-4/5 max-w-3xl p-4 rounded shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Seleccionar Ítem</h2>
          <button onClick={onClose} className="text-red-600 font-bold">✕</button>
        </div>
        <table className="w-full table-auto border">
          <thead>
            <tr>
              <th className="border p-2">Código</th>
              <th className="border p-2">Descripción</th>
              <th className="border p-2">Precio</th>
              <th className="border p-2">Acción</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sequence}>
                <td className="border p-2">{item.sequence}</td>
                <td className="border p-2">{item.description}</td>
                <td className="border p-2 text-right">${item.pvp.toFixed(2)}</td>
                <td className="border p-2">
                  <button
                    onClick={() => onSelect(item)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
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