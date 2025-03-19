import { SearchIcon, Upload } from "lucide-react";
import React, { useState, useEffect } from "react";
import { AiFillYoutube } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../../redux/actions/product";
import InventoryHeader from "./InventoryHeader";
import ActiveProduct from "./ActiveProduct";
import PendingProduct from "../PendingProduct";
import BlockedProducts from "./BlockedProducts";
import PausedProducts from "./PausedProducts";


const Inventory = ({ open, setOpen }) => {
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading } = useSelector((state) => state?.products);
  const [activeTab, setActiveTab] = useState("Active");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (seller?._id) {
      dispatch(getAllProductsShop(seller?._id));
    }
  }, [dispatch, seller?._id]);

  const tabs = [
    { id: 1, name: "Active", count: products?.filter(p => p.status === "Approved").length || 0 },
    { id: 2, name: "Pending", count: products?.filter(p => p.status === "Pending").length || 0 },
    { id: 3, name: "Blocked", count: products?.filter(p => p.status === "Blocked").length || 0 },
    { id: 4, name: "Paused", count: products?.filter(p => p.status === "Paused").length || 0 },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const renderProducts = () => {
    switch (activeTab) {
      case "Active":
        return <ActiveProduct products={products?.filter(p => p.status === "Approved")} />;
      case "Pending":
        return <PendingProduct products={products?.filter(p => p.status === "Pending")} />;
      case "Blocked":
        return <BlockedProducts products={products?.filter(p => p.status === "Blocked")} />;
      case "Paused":
        return <PausedProducts products={products?.filter(p => p.status === "Paused")} />;
      default:
        return null;
    }
  };

  return (
    <div
      className={`w-full ${open ? "md:ml-72" : "md:ml-20"} mt-20 h-[calc(100vh-80px)] p-3 md:p-2 bg-gray-100 overflow-y-auto`}
    >
      <InventoryHeader />
      <div className="mt-3">
        <div className="flex flex-wrap border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`px-2 sm:px-3 py-2 text-[12px] font-semibold focus:outline-none ${
                activeTab === tab.name
                  ? "border-b-2 border-blue-500 text-blue-500"
                  : "text-gray-600"
              }`}
              onClick={() => handleTabClick(tab.name)}
            >
              {tab.name} ({tab.count})
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {isLoading ? <p>Loading products...</p> : renderProducts()}
      </div>
    </div>
  );
};

export default Inventory;
