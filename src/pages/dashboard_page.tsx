/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";

import { getProductCount } from "../services/product_service";
import { getHardwareCount } from "../services/hardware_service";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);
  const [hardwareCount, setHardwareCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const [products, hardware] = await Promise.all([
        getProductCount(),
        getHardwareCount(),
      ]);

      setProductCount(products);
      setHardwareCount(hardware);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-4 gap-4">

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold">
            {productCount}
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Materials
          </p>

          <h2 className="text-3xl font-bold">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Cost Sheets
          </p>

          <h2 className="text-3xl font-bold">
            0
          </h2>
        </div>

        <div className="bg-white rounded-xl p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Hardware
          </p>

          <h2 className="text-3xl font-bold">
            {hardwareCount}
          </h2>
        </div>

      </div>
    </div>
  );
}