/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";

type FrameTableProps = {
  frameMaster: any[];
};

export default function FrameTable({
  frameMaster,
}: FrameTableProps) {
  const [frameRows, setFrameRows] = useState<any[]>([]);

  function addFrameRow() {
    setFrameRows([
      ...frameRows,
      {
        frame_name: "",
        brand: "",
        specification: "",
        rate: 0,
        quantity: 1,
      },
    ]);
  }

  function updateRow(index: number, field: string, value: any) {
    const rows = [...frameRows];

    rows[index][field] = value;

    if (field === "frame_name") {
      rows[index].brand = "";
      rows[index].specification = "";
      rows[index].rate = 0;
    }

    if (field === "brand") {
      rows[index].specification = "";
      rows[index].rate = 0;
    }

    if (field === "specification") {
      const selected = frameMaster.find(
        (h) =>
          h.frame_name === rows[index].frame_name &&
          h.brand === rows[index].brand &&
          h.specification === value,
      );

      if (selected) {
        rows[index].rate = selected.rate;
      }
    }

    setFrameRows(rows);
  }

  const frameTotal = frameRows.reduce(
    (sum, row) => sum + row.rate * row.quantity,
    0,
  );

  return (
    <div className="bg-white rounded-2xl border p-6">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-semibold">frame Components</h2>

        <button
          onClick={addFrameRow}
          className="px-4 py-2 rounded-lg bg-slate-900 text-white"
        >
          Add Component
        </button>
      </div>

      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-3">frame</th>
            <th className="text-left py-3">Brand</th>
            <th className="text-left py-3">Specification</th>
            <th className="text-right py-3">Rate</th>
            <th className="text-right py-3">Qty</th>
            <th className="text-right py-3">Amount</th>
          </tr>
        </thead>

        <tbody>
          {frameRows.map((row, index) => {
            const frameOptions = [
              ...new Set(frameMaster.map((h) => h.frame_name)),
            ];

            const brandOptions = [
              ...new Set(
                frameMaster
                  .filter((h) => h.frame_name === row.frame_name)
                  .map((h) => h.brand),
              ),
            ];

            const specificationOptions = [
              ...new Set(
                frameMaster
                  .filter(
                    (h) =>
                      h.frame_name === row.frame_name &&
                      h.brand === row.brand,
                  )
                  .map((h) => h.specification),
              ),
            ];

            return (
              <tr key={index} className="border-b">
                <td className="py-3">
                  <select
                    value={row.frame_name}
                    onChange={(e) =>
                      updateRow(index, "frame_name", e.target.value)
                    }
                    className="border rounded-lg p-2 w-full"
                  >
                    <option value="">Select</option>

                    {frameOptions.map((name) => (
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
              frame Total
            </td>

            <td className="text-right font-bold pt-4">
              ₹{frameTotal.toLocaleString()}
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}