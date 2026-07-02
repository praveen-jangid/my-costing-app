/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { getRacProductById } from "../../services/RAC/rac_product_service";

import LaminationTable from "../../components/RAC/lamination";
import MdfTable from "../../components/RAC/mdf";
import FrameTable from "../../components/RAC/frame";
import HardwareTable from "../../components/RAC/hardware";
import CostComponents from "../../components/RAC/components";
import CostSummary from "../../components/RAC/summary";

export default function RacCostingPage() {
  const { id } = useParams();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Hardware master should stay here because this page loads it
  const [hardwareMaster, setHardwareMaster] = useState<any[]>([]);
  const [mdfMaster, setMdfMaster] = useState<any[]>([]);
  const [laminationMaster, setLaminationMaster] = useState<any[]>([]);
  const [frameMaster, setFrameMaster] = useState<any[]>([]);

  useEffect(() => {
    console.log("RAC Product ID:", id);
    loadProduct();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadProduct() {
    try {
      const [productData, hardwareData, mdfData, laminationData, frameData] = await Promise.all([
        getRacProductById(Number(id)),
        supabase.from("hardware_master").select("*"),
        supabase.from("mdf_master").select("*"),
        supabase.from("lamination_master").select("*"),
        supabase.from("frame_master").select("*"),
      ]);

      setProduct(productData);

      if (hardwareData.data) {
        setHardwareMaster(hardwareData.data);
      }
      if (mdfData.data) {
        setMdfMaster(mdfData.data);
      }
      if (laminationData.data) {
        setLaminationMaster(laminationData.data);
      }
      if (frameData.data) {
        setFrameMaster(frameData.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

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
            </div>
          </div>
        </div>
      </div>

      {/* KPI CARDS */}

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">
            Manufacturing Cost
          </p>
          <h3 className="text-3xl font-bold mt-2">₹10,000</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">
            Selling Price
          </p>
          <h3 className="text-3xl font-bold mt-2 text-green-600">
            ₹18,388
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">Profit</p>
          <h3 className="text-3xl font-bold mt-2">₹3,065</h3>
        </div>

        <div className="bg-white rounded-2xl p-5 border">
          <p className="text-slate-500 text-sm">Margin</p>
          <h3 className="text-3xl font-bold mt-2 text-blue-600">
            16.7%
          </h3>
        </div>
      </div>

      {/* MAIN CONTENT */}

      <div className="grid grid-cols-12 gap-6">
        {/* LEFT */}

        <div className="col-span-8 space-y-6">

          <LaminationTable laminationMaster={laminationMaster} />
          
          <MdfTable mdfMaster={mdfMaster} />

          <FrameTable frameMaster={frameMaster} />

          <HardwareTable hardwareMaster={hardwareMaster} />


          <CostComponents />
        </div>

        {/* RIGHT */}

        <div className="col-span-4">
          <CostSummary />
        </div>
      </div>
    </div>
  );
}