/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "../services/product_service";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      const data = await getProducts();

      if (data) {
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = products.filter(
    (product) =>
      product.product_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.product_code
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Products
          </h1>

          <p className="text-gray-500 mt-1">
            {products.length} Products
          </p>
        </div>

        <Link
          to="/products/new"
          className="
            px-5
            py-3
            bg-black
            text-white
            rounded-xl
            hover:bg-gray-800
            transition
          "
        >
          + New Product
        </Link>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search by product name or code..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          className="
            w-full
            border
            rounded-lg
            p-3
            outline-none
            focus:ring-2
            focus:ring-gray-300
          "
        />
      </div>

      {/* Products Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-50 border-b">
            <tr>

              <th className="text-left p-4">
                Image
              </th>

              <th className="text-left p-4">
                Product Name
              </th>

              <th className="text-left p-4">
                Assembly
              </th>

              <th className="text-left p-4">
                Finish
              </th>

              <th className="text-left p-4">
                Size
              </th>

              <th className="text-left p-4">
                Date Created
              </th>

            </tr>
          </thead>

          <tbody>

            {loading && (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center"
                >
                  Loading products...
                </td>
              </tr>
            )}

            {!loading &&
              filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="
                      p-10
                      text-center
                      text-gray-500
                    "
                  >
                    No products found
                  </td>
                </tr>
              )}

            {filteredProducts.map((product) => (
              <tr
                key={product.id}
                className="
                  border-b
                  hover:bg-gray-50
                  cursor-pointer
                  transition
                "
                onClick={() =>
                  navigate(`/costing/${product.id}`)
                }
              >
                {/* Image */}

                <td className="p-4">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.product_name}
                      className="
                        w-16
                        h-16
                        object-cover
                        rounded-lg
                        border
                      "
                    />
                  ) : (
                    <div
                      className="
                        w-16
                        h-16
                        rounded-lg
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-2xl
                      "
                    >
                      📦
                    </div>
                  )}
                </td>

                {/* Product */}

                <td className="p-4">
                  <div className="font-semibold">
                    {product.product_name}
                  </div>

                  <div className="text-sm text-gray-500">
                    {product.product_code}
                  </div>
                </td>

                {/* Assembly */}

                <td className="p-4">
                  <span
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-gray-100
                      text-sm
                    "
                  >
                    {product.assembly_type}
                  </span>
                </td>

                {/* Finish */}

                <td className="p-4">
                  {product.finish || "-"}
                </td>

                {/* Size */}

                <td className="p-4">
                  {product.length} × {product.width} ×{" "}
                  {product.height}{" "}
                  {product.unit}
                </td>

              </tr>
            ))}

          </tbody>
        </table>

      </div>
    </div>
  );
}