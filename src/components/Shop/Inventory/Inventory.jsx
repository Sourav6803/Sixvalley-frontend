import { SearchIcon, Upload } from "lucide-react";
import React from "react";
import { AiFillYoutube } from "react-icons/ai";
import { MdYoutubeSearchedFor } from "react-icons/md";
import InventoryHeader from "./InventoryHeader";

const Inventory = ({ open, setOpen }) => {
  return (
    <div
      className={`w-full ${
        open ? "md:ml-72" : "md:ml-20"
      } mt-20 h-[calc(100vh-80px)] p-3 md:p-2 bg-gray-100 overflow-y-auto`}
    >
      <InventoryHeader />
    </div>
  );
};

export default Inventory;
