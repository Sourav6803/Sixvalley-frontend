import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import { AiOutlineCamera } from "react-icons/ai";
import styles from "../../styles/styles";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";


const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [shopName, setShopName] = useState(seller && seller?.shopName)
  const [sellerName, setSellerName] = useState(seller && seller?.sellerName);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(seller && seller.address);
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [zipCode, setZipcode] = useState(seller && seller.zipCode);
  const [imageLoading, setImageLoading] = useState(false);
  const dispatch = useDispatch();



  // const handleImage = async (e) => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setAvatar(reader.result);
  //       axios
  //         .put(
  //           `${server}/shop/update-shop-avatar`,
  //           { avatar: reader.result },
  //           {
  //             withCredentials: true,
  //           }
  //         )
  //         .then((res) => {
  //           dispatch(loadSeller());
  //           toast.success("Avatar updated successfully!");
  //         })
  //         .catch((error) => {
  //           toast.error(error?.response?.data?.message);
  //         });
  //     }
  //   };

  //   reader.readAsDataURL(e?.target?.files[0]);
  // };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("avatar", file);

    setImageLoading(true); // Start loading for image upload
    await axios.put(`${server}/shop/update-shop-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((response) => {
      window.location.reload();
    }).catch((error) => {
      toast.error(error);
    }).finally(() => {
      setImageLoading(false); // Stop loading after image upload completes
    });
  };



  const updateHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/shop/update-seller-info`,
        {
          sellerName,
          shopName,
          address,
          zipCode,
          phoneNumber,
          description,
        },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success("Shop info updated succesfully!");
        dispatch(loadSeller());
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="flex w-full 800px:w-[80%] flex-col justify-center my-8 p-5 rounded-lg bg-white shadow-lg">
        <div className="w-full flex items-center justify-center mb-6">
          <div className="relative group">
            <img
              src={avatar ? avatar : `${seller?.avatar?.url}`}
              alt="Shop Avatar"
              className="w-[200px] h-[200px] rounded-full object-cover shadow-lg cursor-pointer transition duration-300 transform hover:scale-105"
            />
            <div className="absolute bottom-[10px] right-[15px] w-[40px] h-[40px] bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer group-hover:bg-blue-500 transition duration-300">
              <input
                type="file"
                id="image"
                className="hidden"
                onChange={handleImage}
              />
              <label htmlFor="image" className="cursor-pointer text-gray-600 group-hover:text-white">
                <AiOutlineCamera size={20} />
              </label>
            </div>
          </div>
        </div>

        {/* Shop Info Form */}
        <form
          className="flex flex-col items-center"
          onSubmit={updateHandler}
        >
          {/* Shop Name */}
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-2">
            <label className="w-full text-left font-medium text-gray-600 mb-2">Shop Name</label>
            <input
              type="text"
              placeholder={seller?.shopName || "Enter shop name"}
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
              className="w-[95%] mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              required
            />
          </div>

          {/* Seller Name */}
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-2">
            <label className="w-full text-left font-medium text-gray-600 mb-2">Seller Name</label>
            <input
              type="text"
              placeholder={seller?.sellerName || "Enter seller name"}
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
              className="w-[95%] mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              required
            />
          </div>

          {/* Shop Description */}
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-2">
            <label className="w-full text-left font-medium text-gray-600 mb-2">Shop Description</label>
            <textarea
              placeholder={seller?.description || "Enter your shop description"}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-[95%] mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              rows="3"
            />
          </div>

          {/* Shop Address */}
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-2">
            <label className="w-full text-left font-medium text-gray-600 mb-2">Shop Address</label>
            <input
              type="text"
              placeholder={seller?.address || "Enter shop address"}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-[95%] mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-2">
            <label className="w-full text-left font-medium text-gray-600 mb-2">Phone Number</label>
            <input
              type="text"
              placeholder={seller?.phoneNumber || "Enter phone number"}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-[95%] mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              required
            />
          </div>

          {/* Zip Code */}
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-2">
            <label className="w-full text-left font-medium text-gray-600 mb-2">Zip Code</label>
            <input
              type="text"
              placeholder={seller?.zipCode || "Enter zip code"}
              value={zipCode}
              onChange={(e) => setZipcode(e.target.value)}
              className="w-[95%] mb-4 px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-500 outline-none transition duration-300 shadow-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="w-[100%] flex items-center flex-col 800px:w-[50%] mt-5">
            <input
              type="submit"
              value="Update Shop"
              className="w-[95%] px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-600 transition duration-300 shadow-md"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ShopSettings;
