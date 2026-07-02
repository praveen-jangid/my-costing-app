
 
 export default function CostSummary() {
  return (
    <>
      {/* paste table here */}
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

              {/* Profit */}

              <div className="grid grid-cols-3 gap-4 items-center">
                <span className="font-medium">Profit</span>

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

              {/* Grand Total */}

              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total INR</span>

                <span className="font-bold text-lg">₹11,842</span>
              </div>

              <hr />

            </div>
          </div>
        </div>
    </>
  );
}