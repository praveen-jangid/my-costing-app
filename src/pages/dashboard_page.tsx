import { useEffect, useState } from "react";
import { getProductCount } from "../services/product_service";

export default function DashboardPage() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      const count = await getProductCount();
      setProductCount(count);
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
            0
          </h2>
        </div>

      </div>
    </div>
  );
}