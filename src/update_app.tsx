import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "./layouts/app_layout";

import DashboardPage from "./pages/dashboard_page";
import ProductsPage from "./pages/products_page";
import LoginPage from "./pages/login_page";
import CreateProductPage from "./pages/RAC/rac_create_product_page";
import ProductDetailsPage from "./pages/costing_page";
import MaterialsPage from "./pages/materials_page";
import HardwarePage from "./pages/hardware_page";
import PackagingPage from "./pages/packaging_page";
import SettingsPage from "./pages/settings_page";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/new" element={<CreateProductPage />} />

        <Route path="/products/:id" element={<ProductDetailsPage />} />

        <Route path="/materials" element={<MaterialsPage />} />

        <Route path="/hardware" element={<HardwarePage />} />

        <Route path="/packaging" element={<PackagingPage />} />

        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
