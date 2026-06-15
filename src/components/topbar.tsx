export default function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6">
      <div>
        <h2 className="font-semibold">
          Furniture Costing System
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200" />

        <div>
          <p className="text-sm font-medium">
            Praveen
          </p>
          <p className="text-xs text-gray-500">
            Administrator
          </p>
        </div>
      </div>
    </header>
  );
}