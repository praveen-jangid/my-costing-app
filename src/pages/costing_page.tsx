import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProductById } from "../services/product_service";

export default function CostingPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      const data = await getProductById(
        Number(id)
      );

      setProduct(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>

      <div className="flex items-center gap-6 mb-6">

        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.product_name}
            className="
              w-32
              h-32
              object-cover
              rounded-xl
              border
            "
          />
        ) : (
          <div
            className="
              w-32
              h-32
              bg-gray-100
              rounded-xl
            "
          />
        )}

        <div>
          <h1 className="text-3xl font-bold">
            {product.product_name}
          </h1>

          <p className="text-gray-500">
            {product.product_code}
          </p>
        </div>

      </div>

      <div className="grid grid-cols-3 gap-4">

        {/* Product Info */}

        <div className="bg-white p-5 rounded-xl shadow-sm">

          <h2 className="font-semibold mb-4">
            Product Information
          </h2>

          <div className="space-y-2">

            <p>
              <strong>Assembly:</strong>{" "}
              {product.assembly_type}
            </p>

            <p>
              <strong>Finish:</strong>{" "}
              {product.finish || "-"}
            </p>

            <p>
              <strong>Size:</strong>{" "}
              {product.length} × {product.width} × {product.height}{" "}
              {product.unit}
            </p>

          </div>

        </div>

        {/* Costing */}

        <div className="bg-white p-5 rounded-xl shadow-sm">

          <h2 className="font-semibold mb-4">
            Costing Sheet
          </h2>

          <p className="text-gray-500">
            Costing module coming next...
          </p>

        </div>

        {/* History */}

        <div className="bg-white p-5 rounded-xl shadow-sm">

          <h2 className="font-semibold mb-4">
            History
          </h2>

          <p className="text-gray-500">
            Version history coming later...
          </p>

        </div>

      </div>
    <div className="flex gap-6">

      {/* LEFT SIDE */}

      <div className="flex-1 space-y-6">

        {/* Product Header */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex gap-6">

            <div className="w-32 h-32 bg-gray-100 rounded-xl flex items-center justify-center text-5xl">
              📦
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Product Name
              </h1>

              <p className="text-gray-500">
                Product ID: {id}
              </p>

              <div className="mt-4">
                <span className="bg-yellow-100 px-3 py-1 rounded-full">
                  Draft
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* Product Information */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Product Information
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input
              placeholder="Product Name"
              className="border p-3 rounded-lg"
            />

            <input
              placeholder="Product Code"
              className="border p-3 rounded-lg"
            />

            <select className="border p-3 rounded-lg">
              <option>Assembly Type</option>
              <option>Fixed</option>
              <option>KD</option>
            </select>

            <select className="border p-3 rounded-lg">
              <option>FOB</option>
              <option>Yes</option>
              <option>No</option>
            </select>

          </div>
        </div>

        {/* Shipping Information */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Shipping Information
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <select className="border p-3 rounded-lg">
              <option>Container</option>
            </select>

            <select className="border p-3 rounded-lg">
              <option>Port</option>
            </select>

            <select className="border p-3 rounded-lg">
              <option>Currency</option>
            </select>

          </div>
        </div>

        {/* Product Dimensions */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Product Dimensions
          </h2>

          <div className="grid grid-cols-4 gap-4">

            <input
              placeholder="Length"
              className="border p-3 rounded-lg"
            />

            <input
              placeholder="Width"
              className="border p-3 rounded-lg"
            />

            <input
              placeholder="Height"
              className="border p-3 rounded-lg"
            />

            <select className="border p-3 rounded-lg">
              <option>INCH</option>
              <option>MM</option>
              <option>CM</option>
            </select>

          </div>
        </div>

        {/* Carton Information */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Carton Information
          </h2>

          <div className="grid grid-cols-5 gap-4">

            <input placeholder="Length" className="border p-3 rounded-lg" />
            <input placeholder="Width" className="border p-3 rounded-lg" />
            <input placeholder="Height" className="border p-3 rounded-lg" />

            <input
              placeholder="CBM"
              className="border p-3 rounded-lg bg-gray-50"
              readOnly
            />

            <input
              placeholder="Load Count"
              className="border p-3 rounded-lg bg-gray-50"
              readOnly
            />

          </div>
        </div>

        {/* Manufacturing */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Manufacturing Cost
          </h2>

          <input
            placeholder="Manufacturing Cost"
            className="border p-3 rounded-lg w-full"
          />
        </div>

        {/* Hardware */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            External Hardware
          </h2>

          <button className="border px-4 py-2 rounded-lg">
            + Add Hardware
          </button>
        </div>

        {/* Assembly */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Assembly Hardware
          </h2>

          <input
            placeholder="Assembly Cost"
            className="border p-3 rounded-lg w-full"
          />
        </div>

        {/* Materials */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Additional Materials
          </h2>

          <div className="grid grid-cols-2 gap-4">

            <input placeholder="Metal" className="border p-3 rounded-lg" />
            <input placeholder="Marble" className="border p-3 rounded-lg" />
            <input placeholder="Glass" className="border p-3 rounded-lg" />
            <input placeholder="Stone" className="border p-3 rounded-lg" />

          </div>
        </div>

        {/* Finish */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Finish & Material
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <input placeholder="Iron Finish" className="border p-3 rounded-lg" />
            <input placeholder="Finish Material" className="border p-3 rounded-lg" />
            <input placeholder="Sanding Material" className="border p-3 rounded-lg" />

          </div>
        </div>

        {/* Labour */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Labour
          </h2>

          <div className="grid grid-cols-3 gap-4">

            <input placeholder="Sanding Labour" className="border p-3 rounded-lg" />
            <input placeholder="Finish Labour" className="border p-3 rounded-lg" />
            <input placeholder="Packing Labour" className="border p-3 rounded-lg" />

          </div>
        </div>

        {/* Pricing */}

        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-4">
            Pricing
          </h2>

          <div className="grid grid-cols-4 gap-4">

            <input placeholder="Overhead %" className="border p-3 rounded-lg" />
            <input placeholder="Margin %" className="border p-3 rounded-lg" />
            <input placeholder="Commission %" className="border p-3 rounded-lg" />
            <input placeholder="Misc Cost" className="border p-3 rounded-lg" />

          </div>
        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="w-80">

        <div className="sticky top-6 bg-white rounded-xl shadow-sm p-6">

          <h2 className="text-xl font-semibold mb-4">
            Cost Summary
          </h2>

          <div className="space-y-3">

            <div className="flex justify-between">
              <span>Manufacturing</span>
              <span>₹0</span>
            </div>

            <div className="flex justify-between">
              <span>Hardware</span>
              <span>₹0</span>
            </div>

            <div className="flex justify-between">
              <span>Packing</span>
              <span>₹0</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold">
              <span>Landing Cost</span>
              <span>₹0</span>
            </div>

            <div className="flex justify-between font-semibold text-green-600">
              <span>Selling Price</span>
              <span>₹0</span>
            </div>

          </div>

        </div>

      </div>

    </div>
    </div>
  );
}