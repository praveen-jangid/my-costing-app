/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Select from "react-select";

import { createProduct } from "../../services/product_service";
import { uploadProductImage } from "../../services/image_services";
import { getMaterials } from "../../services/material_service";
import { getFinishes } from "../../services/finish_service";

export default function RacCreateProductPage() {
  const [productCode, setProductCode] = useState("");
  const [productName, setProductName] = useState("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");

  const [assemblyType, setAssemblyType] = useState("FIXED");

  const [length, setLength] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const [unit, setUnit] = useState("INCH");

  const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
  const [availableFinishes, setAvailableFinishes] = useState<string[]>([]);

  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedFinishes, setSelectedFinishes] = useState<string[]>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const materials = await getMaterials();
        const finishes = await getFinishes();

        setAvailableMaterials(materials.map((item: any) => item.name));

        setAvailableFinishes(finishes.map((item: any) => item.name));
      } catch (error) {
        console.error(error);
      }
    }

    loadData();
  }, []);

  async function handleSave() {
    try {
      let imageUrl = "";

      if (imageFile) {
        imageUrl = await uploadProductImage(imageFile);
      }

      await createProduct({
        product_code: productCode,
        product_name: productName,
        image_url: imageUrl,
        assembly_type: assemblyType,
        length: Number(length) || 0,
        width: Number(width) || 0,
        height: Number(height) || 0,
        unit,
      });

      console.log("Materials:", selectedMaterials);
      console.log("Finishes:", selectedFinishes);

      alert("Product saved successfully!");

      setProductCode("");
      setProductName("");

      setImageFile(null);
      setPreviewUrl("");

      setAssemblyType("FIXED");

      setLength("");
      setWidth("");
      setHeight("");

      setUnit("INCH");

      setSelectedMaterials([]);
      setSelectedFinishes([]);
    } catch (error) {
      console.error(error);
      alert("Failed to save product");
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create Product</h1>

      <div className="space-y-6">
        {/* Product Info */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left */}
            <div className="space-y-5">
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Product Code
                </label>

                <input
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium">
                  Product Name
                </label>

                <input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="w-full border rounded-lg px-4 py-3"
                />
              </div>
            </div>

            {/* Right */}
            <div>
              <label className="block mb-2 text-sm font-medium">
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
                    className="h-full w-full object-contain rounded-xl"
                  />
                ) : (
                  <>
                    <div className="text-5xl mb-2">📷</div>

                    <p className="font-medium">Click to Upload</p>

                    <p className="text-sm text-gray-500">JPG, PNG</p>
                  </>
                )}
              </label>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;

                  if (!file) return;

                  setImageFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }}
              />
            </div>
          </div>
        </div>

        {/* Materials */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <label className="block mb-3 text-sm font-medium">Materials</label>

          <Select
            isMulti
            options={availableMaterials.map((m) => ({
              value: m,
              label: m,
            }))}
            value={selectedMaterials.map((m) => ({
              value: m,
              label: m,
            }))}
            onChange={(values) =>
              setSelectedMaterials(values.map((v) => v.value))
            }
          />
        </div>

        {/* Finishes */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <label className="block mb-3 text-sm font-medium">Finishes</label>

          <Select
            isMulti
            options={availableFinishes.map((f) => ({
              value: f,
              label: f,
            }))}
            value={selectedFinishes.map((f) => ({
              value: f,
              label: f,
            }))}
            onChange={(values) =>
              setSelectedFinishes(values.map((v) => v.value))
            }
          />
        </div>

        {/* Dimensions */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Dimensions</h2>

          <div className="grid md:grid-cols-4 gap-4">
            <input
              type="number"
              placeholder="Length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="number"
              placeholder="Width"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />

            <input
              type="number"
              placeholder="Height"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="border rounded-lg px-4 py-3"
            />

            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border rounded-lg px-4 py-3"
            >
              <option value="INCH">INCH</option>
              <option value="MM">MM</option>
              <option value="CM">CM</option>
            </select>
          </div>
        </div>

        {/* Assembly */}
        <div className="bg-white rounded-2xl border shadow-sm p-6">
          <label className="block mb-3 text-sm font-medium">
            Assembly Type
          </label>

          <select
            value={assemblyType}
            onChange={(e) => setAssemblyType(e.target.value)}
            className="w-full border rounded-lg px-4 py-3"
          >
            <option value="FIXED">Fixed</option>
            <option value="KD">KD</option>
          </select>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="
              bg-indigo-600
              hover:bg-indigo-700
              text-white
              px-8
              py-3
              rounded-xl
              font-medium
              transition
            "
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}
