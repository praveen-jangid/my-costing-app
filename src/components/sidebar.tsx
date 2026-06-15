import {
  LayoutDashboard,
  Package,
  Hammer,
  Wrench,
  Box,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r h-screen">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold">
          My Costing App
        </h1>
        <p className="text-sm text-gray-500">
          Furniture ERP
        </p>
      </div>

      <nav className="p-5 flex flex-col gap-1">
        <Link
          to="/"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </Link>

        <Link
          to="/products"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Package size={18} />
          Products
        </Link>

        <Link
          to="/materials"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Hammer size={18} />
          Materials
        </Link>

        <Link
          to="/hardware"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Wrench size={18} />
          Hardware
        </Link>

        <Link
          to="/packaging"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Box size={18} />
          Packaging
        </Link>

        <Link
          to="/settings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Settings size={18} />
          Settings
        </Link>
      </nav>
    </aside>
  );
}