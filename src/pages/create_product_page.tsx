import { useState } from "react";
import { createProduct } from "../services/product_service";
import { uploadProductImage } from "../services/image_services";

export default function CreateProductPage() {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [description, setDescription] = useState("");
  const [assemblyType, setAssemblyType] = useState("FIXED");
  const [fobEnabled, setFobEnabled] = useState(false);

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [unit, setUnit] = useState("INCH");
  const [finish, setFinish] = useState("");

  async function handleSave() {
    let imageUrl = "";

    if (imageFile) {
    imageUrl =
        await uploadProductImage(imageFile);
    }
    try {
      await createProduct({
        product_code: productCode,
        product_name: productName,
        image_url: imageUrl,
        description,

        assembly_type: assemblyType,
        fob_enabled: fobEnabled,

        length: Number(length) || 0,
        width: Number(width) || 0,
        height: Number(height) || 0,

        unit,
        finish,
      });

      alert("Product saved successfully!");

      setProductCode("");
      setProductName("");
      setDescription("");
      setAssemblyType("FIXED");
      setFobEnabled(false);
      setLength("");
      setWidth("");
      setHeight("");
      setUnit("INCH");
      setFinish("");
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  }

  return (
    <div className="max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">
        Create Product
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 space-y-6">

        {/* Basic Info */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Basic Information
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Product Code"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="text"
              placeholder="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="border rounded-lg p-3"
            />
            <div className="space-y-4">

  <label className="block font-medium">
    Product Image
  </label>

  <label
    htmlFor="product-image"
    className="
      flex
      flex-col
      items-center
      justify-center
      h-64
      border-2
      border-dashed
      rounded-xl
      cursor-pointer
      bg-gray-50
      hover:bg-gray-100
    "
  >

    {previewUrl ? (

      <img
        src={previewUrl}
        alt="Preview"
        className="h-full object-contain rounded-xl"
      />

    ) : (

      <>
        <div className="text-5xl mb-2">
          📷
        </div>

        <p className="font-medium">
          Click to Upload
        </p>

        <p className="text-sm text-gray-500">
          JPG, PNG up to 2MB
        </p>
      </>

    )}

  </label>

  <input
    id="product-image"
    type="file"
    accept="image/*"
    className="hidden"
    onChange={(e) => {

      const file =
        e.target.files?.[0] || null;

      if (!file) return;

      setImageFile(file);

      setPreviewUrl(
        URL.createObjectURL(file)
      );
    }}
  />

</div>
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded-lg p-3 w-full mt-4"
            rows={4}
          />
        </div>

        {/* Product Config */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Product Configuration
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <select
              value={assemblyType}
              onChange={(e) => setAssemblyType(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="FIXED">Fixed</option>
              <option value="KD">KD</option>
            </select>

            <select
              value={fobEnabled ? "YES" : "NO"}
              onChange={(e) =>
                setFobEnabled(e.target.value === "YES")
              }
              className="border rounded-lg p-3"
            >
              <option value="YES">FOB Enabled</option>
              <option value="NO">FOB Disabled</option>
            </select>
          </div>
        </div>

        {/* Dimensions */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Dimensions
          </h2>

          <div className="grid grid-cols-4 gap-4">
            <input
              type="number"
              placeholder="Length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border rounded-lg p-3"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option value="INCH">INCH</option>
              <option value="MM">MM</option>
              <option value="CM">CM</option>
            </select>
          </div>
        </div>

        {/* Finish */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Finish
          </h2>

          <input
            type="text"
            placeholder="Finish"
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            className="border rounded-lg p-3 w-full"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-black text-white px-6 py-3 rounded-lg"
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}