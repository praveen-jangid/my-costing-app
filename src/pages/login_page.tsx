export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 border rounded-xl p-6">
        <h1 className="text-2xl font-bold mb-4">
          My Costing App
        </h1>

        <input
          placeholder="Email"
          className="border p-2 w-full mb-3"
        />

        <input
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-3"
        />

        <button className="w-full border p-2">
          Login
        </button>
      </div>
    </div>
  );
}