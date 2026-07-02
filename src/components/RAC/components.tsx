

export default function CostComponents() {
  return (
    <>
      {/* paste table here */}
      {/* Sanding And Finishing*/}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden mb-6">
            <div className="px-6 py-4 border-b">
              <h2 className="text-xl font-semibold">Cost Components</h2>
            </div>

            <table className="w-full">
              <tbody>
                {[
                  "Woods Total Amount",
                  "Wastage",
                  "Sub Total (1)",
                  "Total Hardware",
                  "Consumable Hardware",
                  "Lamination Labour",
                  "Machining Labour",
                  "Assembly Labour",
                  "CNC Charges",
                  "Fitting Labour",
                  "Turning/ Carving / Aara Job",
                  "Others",
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
    </>
  );
}