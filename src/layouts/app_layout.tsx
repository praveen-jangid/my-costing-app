import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";

export default function AppLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}