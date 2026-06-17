/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getHardwares } from "../services/hardware_service";

export default function HardwarePage() {
  const [hardwares, setHardwares] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadHardwares();
  }, []);

  async function loadHardwares() {
    try {
      const data = await getHardwares();

      if (data) {
        setHardwares(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const filteredHardwares = hardwares.filter(
    (hardware) =>
      hardware.hardware_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      hardware.brand
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      hardware.specification
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Header */}

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">
            Hardware
          </h1>

          <p className="text-gray-500 mt-1">
            {hardwares.length} Hardware Items
          </p>
        </div>

        <Link
          to="/hardware/new"
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
          + New Hardware
        </Link>
      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
        <input
          type="text"
          placeholder="🔍 Search hardware..."
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

      {/* Hardware Table */}

      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">

          <thead className="bg-gray-50 border-b">
            <tr>

              <th className="text-left p-4">
                Hardware Name
              </th>

              <th className="text-left p-4">
                Brand
              </th>

              <th className="text-left p-4">
                Specification
              </th>

              <th className="text-left p-4">
                Rate
              </th>

              <th className="text-left p-4">
                Created
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
                  Loading hardware...
                </td>
              </tr>
            )}

            {!loading &&
              filteredHardwares.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="
                      p-10
                      text-center
                      text-gray-500
                    "
                  >
                    No hardware found
                  </td>
                </tr>
              )}

            {filteredHardwares.map(
              (hardware) => (
                <tr
                  key={hardware.hardware_id}
                  className="
                    border-b
                    hover:bg-gray-50
                    transition
                  "
                >

                  <td className="p-4">
                    <div className="font-semibold">
                      {hardware.hardware_name}
                    </div>
                  </td>

                  <td className="p-4">
                    {hardware.brand}
                  </td>

                  <td className="p-4">
                    {hardware.specification}
                  </td>

                  <td className="p-4 font-medium">
                    ₹{Number(
                      hardware.rate
                    ).toLocaleString()}
                  </td>

                  <td className="p-4 text-gray-500">
                    {hardware.created_at
                      ? new Date(
                          hardware.created_at
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>
      </div>
    </div>
  );
}