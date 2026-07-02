/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

type HardwareTableProps = {
  hardwareMaster: any[];
};

export default function HardwareTable({
  hardwareMaster,
}: HardwareTableProps) {
  const [hardwareRows, setHardwareRows] = useState<any[]>([]);

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

  return (
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
                      updateRow(
                        index,
                        "quantity",
                        Number(e.target.value),
                      )
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
  );
}