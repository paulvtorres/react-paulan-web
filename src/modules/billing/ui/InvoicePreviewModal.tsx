import React, { useState, useEffect, useRef } from 'react';
import type { InvoiceItem } from '../domain/invoice';
//import { calculateIva } from '@/shared/calculates/calculateIva';

import { calculateIva } from '../../../shared/calculates/calculateIva';
//import { makeStyles, Button, Grid, Container, Paper, TablePagination, TableContainer, TableHead, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
//import Pdf from 'react-to-pdf'

interface ItemModalProps {
    onClose: () => void;
    invoiceItems: InvoiceItem[];
    clientString: string;
}
export const InvoicePreviewModal = ({ onClose, invoiceItems, clientString }: ItemModalProps) => {

    const cadena = 'EMpresa'

    const subTotal = invoiceItems.reduce((sum, row) => sum + row.subtotal, 0);
    const iva = invoiceItems.reduce((sum, row) => sum + calculateIva(row.subtotal, row.iva_percentage), 0);
    const total = subTotal + iva

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-4/5 max-w-3xl p-4 rounded shadow-lg">
               
                    <h2 className="text-2xl font-bold mb-4 text-center">Vista previa de la factura</h2>

                    <div className="mb-4 text-sm">
                        <strong>Cliente:</strong> {clientString} <br />
                        {/*     <strong>Cliente:</strong> {selectedClient?.razon_social} <br />
            <strong>Dirección:</strong> {selectedClient?.address} <br />
            <strong>Teléfono:</strong> {selectedClient?.phone} */}
                    </div>

                    <table className="w-full text-sm border-collapse border mb-4">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="border p-2">Código</th>
                                <th className="border p-2">Descripción</th>
                                <th className="border p-2 text-right">PVP</th>
                                <th className="border p-2 text-right">Cantidad</th>
                                <th className="border p-2 text-right">Subtotal</th>
                                <th className="border p-2 text-right">IVA %</th>
                            </tr>
                        </thead>
                        <tbody>
                            {invoiceItems.map((item, i) => (
                                <tr key={i}>
                                    <td className="border p-2">{item.code}</td>
                                    <td className="border p-2">{item.description}</td>
                                    <td className="border p-2 text-right">{item.pvp.toFixed(2)}</td>
                                    <td className="border p-2 text-right">{item.quantity}</td>
                                    <td className="border p-2 text-right">{item.subtotal.toFixed(2)}</td>
                                    <td className="border p-2 text-right">{item.iva_descripcion}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/*       <div className="text-right text-sm space-y-1 font-semibold">
            <div>Subtotal: ${subTotal.toFixed(2)}</div>
            {Object.entries(resumenPorIva).map(([key, { iva }]) => (
              <div key={key}>
                IVA {key}: ${iva.toFixed(2)}
              </div>
            ))}
            <div>Total: ${total.toFixed(2)}</div>
          </div> */}

                    <div className="mt-4 text-center">
                        <button
                            onClick={onClose}
                            className="bg-gray-400 px-4 py-2 rounded text-white"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
        </div>
    );
}

