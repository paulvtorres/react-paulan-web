import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../shared/ui/Layout";
import { ClientList } from "../modules/client/ui/ClientList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "clients/list", element: <ClientList /> },
      { path: "items", element: <div>Items (Coming Soon)</div> },
      { path: "invoices", element: <div>Invoices (Coming Soon)</div> },
    ],
  },
]);