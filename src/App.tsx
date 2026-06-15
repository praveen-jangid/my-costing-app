import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import AppLayout from "./layouts/app_layout";

import DashboardPage from "./pages/dashboard_page";
import ProductsPage from "./pages/products_page";
import LoginPage from "./pages/login_page";

import CreateProductPage from "./pages/create_product_page";
import CostingPage from "./pages/costing_page";
import MaterialsPage from "./pages/materials_page";
import HardwarePage from "./pages/hardware_page";
import PackagingPage from "./pages/packaging_page";
import SettingsPage from "./pages/settings_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={<LoginPage />}
        />

        {/* Main App Layout */}
        <Route element={<AppLayout />}>
          {/* Dashboard */}
          <Route
            path="/"
            element={<DashboardPage />}
          />

          {/* Products */}
          <Route
            path="/products"
            element={<ProductsPage />}
          />

          <Route
            path="/products/new"
            element={<CreateProductPage />}
          />

          {/* Costing */}
          <Route
            path="/costing/:id"
            element={<CostingPage />}
          />

          {/* Materials */}
          <Route
            path="/materials"
            element={<MaterialsPage />}
          />

          {/* Hardware */}
          <Route
            path="/hardware"
            element={<HardwarePage />}
          />

          {/* Packaging */}
          <Route
            path="/packaging"
            element={<PackagingPage />}
          />

          {/* Settings */}
          <Route
            path="/settings"
            element={<SettingsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;