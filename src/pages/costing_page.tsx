/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../lib/supabase";
import { getProductById } from "../services/product_service";

export default function CostingPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [hardwareMaster, setHardwareMaster] = useState<any[]>([]);

  const [hardwareRows, setHardwareRows] = useState<any[]>([]);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProduct() {
    try {
      const [productData, hardwareData] = await Promise.all([
        getProductById(Number(id)),
        supabase.from("hardware_master").select("*"),
      ]);

      setProduct(productData);

      if (hardwareData.data) {
        setHardwareMaster(hardwareData.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function addHardwareRow() {
    setHardwareRows([
      ...hardwareRows,
      {
        hardware_name: "",
        brand: "",
        specification: "",
        rate: 0,
        quantity: 1,
      },
    ]);
  }

  function updateRow(index: number, field: string, value: any) {
    const rows = [...hardwareRows];

    rows[index][field] = value;

    if (field === "hardware_name") {
      rows[index].brand = "";
      rows[index].specification = "";
      rows[index].rate = 0;
    }

    if (field === "brand") {
      rows[index].specification = "";
      rows[index].rate = 0;
    }

    if (field === "specification") {
      const selected = hardwareMaster.find(
        (h) =>
          h.hardware_name === rows[index].hardware_name &&
          h.brand === rows[index].brand &&
          h.specification === value,
      );

      if (selected) {
        rows[index].rate = selected.rate;
      }
    }

    setHardwareRows(rows);
  }

  const hardwareTotal = hardwareRows.reduce(
    (sum, row) => sum + row.rate * row.quantity,
    0,
  );

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!product) {
    return <div className="p-6">Product not found</div>;
  }

  return (
    <div className="bg-[#bebdbd] rounded-2xl border border-[#334422] p-6 mb-6">
      {/* PRODUCT DETAILS */}

      <div className="bg-[#ffffff] rounded-2xl border border-[#000000] p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900">
            Product Details
          </h2>

          <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
            {product?.assembly_type || "Assembly"}
          </span>
        </div>

        <div className="flex gap-6">
          {/* IMAGE */}

          <div className="shrink-0">
            {product?.image_url ? (
              <img
                src={product.image_url}
                alt={product.product_name}
                className="w-40 h-40 rounded-xl object-cover border border-slate-200"
              />
            ) : (
              <div className="w-40 h-40 rounded-xl bg-slate-100 border border-slate-200" />
            )}
          </div>

          {/* DETAILS */}

          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-slate-900">
                {product?.product_name}
              </h1>

              <p className="text-slate-500 mt-2">{product?.product_code}</p>
            </div>

            <div className="grid grid-cols-4 gap-x-8 gap-y-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Length
                </p>
                <p className="font-semibold text-slate-900">
                  {product?.length || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Width
                </p>
                <p className="font-semibold text-slate-900">
                  {product?.width || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Height
                </p>
                <p className="font-semibold text-slate-900">
                  {product?.height || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Unit
                </p>
                <p className="font-semibold text-slate-900">
                  {product?.unit || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Finish
                </p>
                <p className="font-semibold text-slate-900">
                  {product?.finish || "-"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Material
                </p>
                <p className="font-semibold text-slate-900">Wood & Metal</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  FOB
                </p>
                <p className="font-semibold text-slate-900">Mundra Port</p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400 mb-1">
                  Assembly
                </p>
                <p className="font-semibold text-slate-900">Knockdown</p>
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* CONTAINER CALCULATOR */}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">CBM</p>

          <h3 className="text-3xl font-bold mt-2">0.85</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm mb-3">40 HQ Container</p>

          <div className="flex justify-between">
            <div>
              <p className="text-slate-400 text-xs">Load Count</p>

              <p className="font-semibold">320</p>
            </div>

            <div>
              <p className="text-slate-400 text-xs">Length</p>

              <p className="font-semibold">120</p>
            </div>

            <div>
              <p className="text-slate-400 text-xs">Width</p>

              <p className="font-semibold">45</p>
            </div>

            <div>
              <p className="text-slate-400 text-xs">Height</p>

              <p className="font-semibold">80</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">Production Cost</p>
          <h3 className="text-3xl font-bold mt-2">₹15,323</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">Selling Price</p>
          <h3 className="text-3xl font-bold mt-2 text-green-600">₹18,388</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">Profit</p>
          <h3 className="text-3xl font-bold mt-2">₹3,065</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">Margin</p>
          <h3 className="text-3xl font-bold mt-2 text-blue-600">16.7%</h3>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}

        <div className="col-span-8 space-y-6">
          {/* COST COMPONENTS */}

          <div className="bg-white rounded-2xl border p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold">Hardware Components</h2>

              <button
                onClick={addHardwareRow}
                className="px-4 py-2 rounded-lg bg-slate-900 text-white"
              >
                Add Component
              </button>
            </div>

            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Hardware</th>

                  <th className="text-left py-3">Brand</th>

                  <th className="text-left py-3">Specification</th>

                  <th className="text-right py-3">Rate</th>

                  <th className="text-right py-3">Qty</th>

                  <th className="text-right py-3">Amount</th>
                </tr>
              </thead>

              <tbody>
                {hardwareRows.map((row, index) => {
                  const hardwareOptions = [
                    ...new Set(hardwareMaster.map((h) => h.hardware_name)),
                  ];

                  const brandOptions = [
                    ...new Set(
                      hardwareMaster
                        .filter((h) => h.hardware_name === row.hardware_name)
                        .map((h) => h.brand),
                    ),
                  ];

                  const specificationOptions = [
                    ...new Set(
                      hardwareMaster
                        .filter(
                          (h) =>
                            h.hardware_name === row.hardware_name &&
                            h.brand === row.brand,
                        )
                        .map((h) => h.specification),
                    ),
                  ];

                  return (
                    <tr key={index} className="border-b">
                      <td className="py-3">
                        <select
                          value={row.hardware_name}
                          onChange={(e) =>
                            updateRow(index, "hardware_name", e.target.value)
                          }
                          className="border rounded-lg p-2 w-full"
                        >
                          <option value="">Select</option>

                          {hardwareOptions.map((name) => (
                            <option key={String(name)} value={String(name)}>
                              {String(name)}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3">
                        <select
                          value={row.brand}
                          onChange={(e) =>
                            updateRow(index, "brand", e.target.value)
                          }
                          className="border rounded-lg p-2 w-full"
                        >
                          <option value="">Select</option>

                          {brandOptions.map((brand) => (
                            <option key={String(brand)} value={String(brand)}>
                              {String(brand)}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="py-3">
                        <select
                          value={row.specification}
                          onChange={(e) =>
                            updateRow(index, "specification", e.target.value)
                          }
                          className="border rounded-lg p-2 w-full"
                        >
                          <option value="">Select</option>

                          {specificationOptions.map((specification) => (
                            <option
                              key={String(specification)}
                              value={String(specification)}
                            >
                              {String(specification)}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="text-right">
                        ₹{row.rate.toLocaleString()}
                      </td>

                      <td className="text-right">
                        <input
                          type="number"
                          min="1"
                          value={row.quantity}
                          onChange={(e) =>
                            updateRow(index, "quantity", Number(e.target.value))
                          }
                          className="border rounded-lg p-2 w-20 text-right"
                        />
                      </td>

                      <td className="text-right font-medium">
                        ₹{(row.rate * row.quantity).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>

              <tfoot>
                <tr>
                  <td colSpan={5} className="text-right font-semibold pt-4">
                    Hardware Total
                  </td>

                  <td className="text-right font-bold pt-4">
                    ₹{hardwareTotal.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Sanding And Finishing*/}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Cost Components</h2>
            </div>

            <table className="w-full">
              <tbody>
                {[
                  "Assembly Hardware",
                  "Metal",
                  "Marble",
                  "Iron Finish",
                  "Sanding Material",
                  "Sanding Labour",
                  "Finish Material",
                  "Finish Labour",
                  "Fitting Labour",
                  "FOB",
                ].map((item) => (
                  <tr key={item} className="border-b last:border-b-0">
                    <td className="px-6 py-4 font-medium text-slate-700 w-1/2">
                      {item}
                    </td>

                    <td className="px-6 py-4">
                      <input
                        type="number"
                        placeholder="0.00"
                        className="
                w-full
                border
                rounded-lg
                px-3
                py-2
              "
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="col-span-4">
          <div className="sticky top-6 bg-white rounded-2xl border border-slate-200 p-6">
            <h2 className="text-xl font-semibold mb-6">Cost Summary</h2>

            <div className="space-y-4">
              {/* Total */}

              <div className="flex justify-between items-center pb-4 border-b">
                <span className="font-semibold text-slate-700">Total Cost</span>

                <span className="text-xl font-bold">₹8,000</span>
              </div>

              {/* OH */}

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Overheads</span>

                <input
                  type="number"
                  defaultValue="15"
                  className="
                      w-16
          border
          rounded-lg
          px-2
          py-1
          text-center
        "
                />

                <span className="text-right font-semibold">₹1,200</span>
              </div>

              {/* Margin */}

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Margin</span>

                <input
                  type="number"
                  defaultValue="20"
                  className="
          w-16
          border
          rounded-lg
          px-2
          py-1
          text-center
        "
                />

                <span className="text-right font-semibold text-green-600">
                  ₹1,840
                </span>
              </div>

              {/* Commission */}

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Commission</span>

                <input
                  type="number"
                  defaultValue="5"
                  className="
                      w-16
          border
          rounded-lg
          px-2
          py-1
          text-center
        "
                />

                <span className="text-right font-semibold">₹552</span>
              </div>

              {/* Misc */}

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Misc</span>

                <input
                  type="number"
                  defaultValue="250"
                  className="
          w-16
          border
          rounded-lg
          px-2
          py-1
          text-center
        "
                />

                <span className="text-right font-semibold">₹250</span>
              </div>

              <hr />

              {/* Grand Total */}

              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total INR</span>

                <span className="font-bold text-lg">₹11,842</span>
              </div>

              <hr />

              {/* Dollar */}

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Dollar Rate</span>

                <input
                  type="number"
                  defaultValue="85"
                  className="
                      w-16
          border
          rounded-lg
          px-2
          py-1
          text-center
        "
                />

                <span className="text-right font-bold text-blue-600">$139</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
