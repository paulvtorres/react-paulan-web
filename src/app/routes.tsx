import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../shared/ui/Layout";
import { ClientList } from "../modules/client/ui/ClientList";
//import InvoiceForm from "@/modules/billing/ui/InvoiceForm";
import { InvoiceForm } from "../modules/billing/ui/InvoiceForm";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "clients/list", element: <ClientList /> },
      { path: "items", element: <div>Items (Coming Soon)</div> },
      { path: "invoices", element: <InvoiceForm />  },
    ],
  },
]);