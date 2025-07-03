import { useEffect, useRef, useState } from "react";
import type { Client } from "../domain/Client";
import { validateIdentification } from "../../../shared/utils/validateIdentification";
//import { validateIdentification } from "@/shared/utils/validateIdentification";
import { createClient } from "../application/createClient";
import { useSelector } from "react-redux";
//import { makeSelectCatalogByType } from "@/modules/catalogSRI/store/catalogSriSelectors";
import { makeSelectCatalogByType } from "../../../modules/catalogSRI/store/catalogSriSelectors";
import { makeSelectClienteExistsById } from "../store/clientesSelectors";


interface Props {
  onClose: () => void;
  onSuccess: (client: Client) => void;
}

export const ClientFormModal = ({ onClose, onSuccess }: Props) => {
  const [form, setForm] = useState({
    id: "",
    id_type: "05",
    razon_social: "",
    address: "",
    phone: "",
    email: ""
  });

  const tipoIdSelector = makeSelectCatalogByType("tipo_id");
  const tipoIdSri = useSelector(tipoIdSelector);
  const clienteExisteSelector = makeSelectClienteExistsById(form.id);
  const clienteExiste = useSelector(clienteExisteSelector);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
   
  const handleSave = async () => {
     /*const isValid = validateIdentification(form.tipo_id, form.id);
    if (!isValid) {
      setError("⚠️ El número de identificación es inválido.");
      return;
    }

    if (clienteExiste) {
      setError("❌ El número de identificación ya está registrado.");
      return;
    }*/
    try {
      const newClient = await createClient(form);
      onSuccess(newClient);
      onClose();
    } catch (e) {
      setError("❌ Error al guardar el cliente.");
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose(); // clic fuera del modal
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose(); // tecla ESC
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div ref={modalRef} className="bg-white p-6 rounded-xl shadow-xl w-[600px] max-w-full">
             <h2 className="text-xl font-bold mb-4">Nuevo Cliente</h2>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Tipo de ID</label>
              <select
                name="id_type"  // 👈 importante que coincida con la propiedad del estado `form`
                value={form.id_type}
                onChange={handleChange}
                className="border px-2 py-1 w-full"
              >
                {tipoIdSri.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.code + ' - ' + item.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Identificación</label>
              <input name="id" value={form.id} onChange={handleChange} className="border px-2 py-1 w-full" />
            </div>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Nombre o Razón Social</label>
              <input name="razon_social" value={form.razon_social} onChange={handleChange} className="border px-2 py-1 w-full" />
            </div>

            <div className="mb-2">
              <label className="block mb-1 font-medium">Dirección</label>
              <input name="address" value={form.address} onChange={handleChange} className="border px-2 py-1 w-full" />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Teléfono</label>
              <input name="phone" value={form.phone} onChange={handleChange} className="border px-2 py-1 w-full" />
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">E-mail</label>
              <input name="email" value={form.email} onChange={handleChange} className="border px-2 py-1 w-full" />
            </div>

            {error && <p className="text-red-600 mb-3">{error}</p>}

            <div className="flex justify-end gap-2">
              <button onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded">Guardar</button>
            </div>
          </div>
        </div>
  );
};


