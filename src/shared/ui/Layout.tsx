import { Sidebar } from "./Sidebar";
import { Outlet } from "react-router-dom";

export const Layout = () => (
  <div className="flex h-screen">
    <Sidebar />
    <main className="flex-1 bg-gray-100 p-4 overflow-auto">
      <Outlet />
    </main>
  </div>
);