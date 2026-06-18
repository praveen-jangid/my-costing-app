import {
  LayoutDashboard,
  Package,
  Wrench,
  Box,
  Settings,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    label: "Products",
    icon: Package,
    path: "/products",
  },
  {
    label: "RAC Products",
    icon: Package,
    path: "/rac-products",
  },
  {
    label: "Manufacturing",
    icon: Package,
    path: "/manufacturing",
  },
  {
    label: "Hardware",
    icon: Wrench,
    path: "/hardware",
  },
  {
    label: "Packaging",
    icon: Box,
    path: "/packaging",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800">
      {/* Logo */}
      <div className="h-20 px-6 flex items-center border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Costing ERP
          </h1>

          <p className="text-sm text-slate-400">
            Furniture Manufacturing
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="mb-4">
          <p className="px-3 mb-2 text-xs uppercase tracking-wider text-slate-500">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    px-3 py-3
                    rounded-xl
                    transition-all
                    ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-lg"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
                    }
                  `
                  }
                >
                  <Icon size={18} />

                  <span className="font-medium">
                    {item.label}
                  </span>
                </NavLink>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-800 rounded-xl p-3">
          <p className="text-sm font-medium">
            My Costing App
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Version 1.0
          </p>
        </div>
      </div>
    </aside>
  );
}