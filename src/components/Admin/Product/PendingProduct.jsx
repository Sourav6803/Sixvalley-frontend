import React, {  useEffect, useState } from "react";
import { AiOutlineEye,  } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { getAllProductsShop } from "../../../redux/actions/product";
import axios from "axios";
import { server } from "../../../server";
import { toast } from "react-toastify";
import Loader from "../../../pages/Loader";
import Modal from "../../../utils/Modal";
import productImage from "../icon/package-box.png";


const PendingProduct = () => {
  const { products, isLoading } = useSelector((state) => state?.products);

  const pendingProducts =
    products && products?.filter((product) => product.status === "Pending");

  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAllProductsShop(seller?._id));
  }, [dispatch, seller?._id]);

  
  const [isDelete, setIsDelete] = useState(false);
  const [searchTearm, setSearchTearm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [brand, setBrand] = useState("");
  const [productId, setProductId] = useState("");
 
  const [approvedModalOpen, setApprovedModalOpen] = useState(false);
  const [rejectModalOpen, setRejectedMoalOpen] = useState(false);

  const updateProductStatus = async (id, approvalStatus) => {
    try {
      
      const res = await axios.put(
        `${server}/product/admin-product-approval/${id}`,
        { approvalStatus },
        { withCredentials: true }
      );
      
      toast.success(res.data.message || "Status updated");
      if(approvalStatus === "Approved"){
        setApprovedModalOpen(false);
      }else{
        setRejectedMoalOpen(false)
      }
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      toast.error("Error Updating Status");
   
    } 
  };

  useEffect(() => {
    if (searchTearm) {
      const filterProduct = pendingProducts?.filter((product) =>
        product.name.toLowerCase().includes(searchTearm.toLowerCase())
      );
      setSearchData(filterProduct);
    } else {
      setSearchData(null);
    }
  }, [searchTearm, pendingProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterProduct = pendingProducts?.filter((product) =>
      product?.name.toLowerCase().includes(searchTearm?.toLowerCase())
    );
    setSearchData(filterProduct);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get the data for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = (searchData || pendingProducts)?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Calculate total pages
  const totalPages = Math.ceil(
    (searchData || pendingProducts)?.length / itemsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      {isLoading === true ? (
        <div className="flex items-center justify-center"></div>
      ) : (
        <div className="w-full p-2 md:p-5 bg-gray-200 mt-5">
          <div className="flex items-center gap-2">
            <img src={productImage} alt="layout" className="h-8" />
            <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">
              Pending Product List: {products?.length}
            </h3>
          </div>

          {/* Product table */}

          <div className="w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md">
            <div className="flex items-center justify-end flex-col md:flex-row gap-2 md:gap-0">
              <div className="mt-2 flex items-center justify-center">
                <div className="w-120 bg-white  shadow-lg ">
                  <form className="flex items-center justify-center p-2">
                    <input
                      type="text"
                      placeholder="Search product by name"
                      value={searchTearm}
                      onChange={(e) => setSearchTearm(e.target.value)}
                      className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    />
                    <button
                      type="submit"
                      onClick={handleSearch}
                      className="bg-blue-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
                    >
                      Search
                    </button>
                  </form>
                </div>
              </div>
            </div>

            <div className="w-full  bg-white ">
              <section className="container px-4 mt-2 ">
                <div className="flex flex-col mt-6">
                  <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 ">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500 dark:text-gray-400 whitespace-nowrap"
                              >
                                SL
                              </th>

                              <th
                                scope="col"
                                className="pl-8 pr-8 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap"
                              >
                                Product Details
                              </th>

                              <th
                                scope="col"
                                className="pl-6 pr-6 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap"
                              >
                                SKU Id
                              </th>

                              <th
                                scope="col"
                                className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap"
                              >
                                Price
                              </th>

                              <th
                                scope="col"
                                className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap"
                              >
                                Brand
                              </th>

                              

                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 whitespace-nowrap"
                              >
                                Stock
                              </th>

                              
                              <th
                                scope="col"
                                className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap"
                              >
                                View
                              </th>

                              <th
                                scope="col"
                                className="relative py-3.5 px-4 whitespace-nowrap"
                              >
                                <span className="">Actions</span>
                              </th>
                            </tr>
                          </thead>

                          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {currentData?.length > 0 ? (
                              currentData?.map((product, index) => (
                                <tr key={index}>
                                  <td className="px-2 py-4 text-sm font-medium  ">
                                    <div className="text-center">
                                      <h2 className="font-medium text-gray-800 dark:text-white ">
                                        {index + 1}
                                      </h2>
                                    </div>
                                  </td>
                                  <td className="px-1   py-2 w-full ">
                                    <div className="w-full flex items-center gap-x-1 justify-between ">
                                      <div className="w-[30%] h-full flex items-center justify-center">
                                        <img
                                          className="object-cover w-[50px] h-[50px] rounded-md"
                                          src={product?.images[0]?.url}
                                          alt="Imag"
                                        />
                                      </div>
                                      <div className=" h-full w-full">
                                        <h2 className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                          {product?.name?.length > 30
                                            ? product.name.slice(0, 30) + "..."
                                            : product?.name}
                                        </h2>
                                        <p className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                          <span className="font-bold text-gray-800 dark:text-white text-[12px]">
                                            Category:
                                          </span>{" "}
                                          {product?.category}
                                        </p>
                                        <p className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                          <span className="font-bold text-gray-800 dark:text-white text-[12px]">
                                            Sub Category:{" "}
                                          </span>
                                          {product?.subCategory}
                                        </p>
                                        <p className="font-normal text-gray-800 dark:text-white text-[12px] ">
                                          <span className="font-bold text-gray-800 dark:text-white text-[12px]">
                                            Brand:{" "}
                                          </span>
                                          {product?.brand}
                                        </p>
                                      </div>
                                    </div>
                                  </td>

                                  <td className="px-2  py-2 w-full ">
                                    <div className="w-full flex items-center justify-center  gap-x-3">
                                      {product?.sku}
                                    </div>
                                  </td>

                                  <td className="px-2 py-4 text-sm w-[50px]  ">
                                    <div className="text-center">
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        {product?.afterDiscountPrice}
                                      </h4>
                                    </div>
                                  </td>

                                  <td className="px-4 py-4 w-[50px]  text-sm ">
                                    <div className="text-center">
                                      <h4 className="text-gray-700 dark:text-gray-200">
                                        {product?.brand}
                                      </h4>
                                    </div>
                                  </td>

                                  

                                  <td className="px-4 py-4 text-sm ">
                                    <h4 className="text-gray-700 text-center dark:text-gray-200">
                                      {product?.stock}
                                    </h4>
                                  </td>

                                 

                                  <td className="px-4 py-4 text-sm w-[50px] ">
                                    <button
                                      className="text-xl border-2 rounded-md p-1 border-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                      onClick={() =>
                                        navigate(
                                          `/dashboard/product-view/${product._id}`
                                        )
                                      }
                                    >
                                      <AiOutlineEye className="text-blue-500 hover:text-white" />
                                    </button>
                                  </td>

                                

                                  <td className="px-4 py-4 text-sm ">
                                    <div className="flex flex-col gap-2 ">
                                      <button
                                        onClick={() => { setApprovedModalOpen(true); setProductId(product?._id);}}
                                        className=" bg-blue-600 hover:bg-blue-700 shadow-md text-white px-3 py-1 rounded-md"
                                      >
                                        Approved
                                      </button>
                                      <button
                                        onClick={() => { setRejectedMoalOpen(true); setProductId(product?._id);}}
                                        className=" px-3 py-1 rounded-md bg-red-500 hover:bg-red-600 shadow-md text-white"
                                      >
                                        Reject
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr >
                                <td
                                  colSpan="5"
                                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                                >
                                  No Pending product found
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>

                        {pendingProducts?.length > 9 && (
                          <div className="flex  justify-end items-center my-2 mx-2 ">
                            {/* Previous Button */}
                            <button
                              className={`px-4 py-2 rounded-md text-white font-semibold ${
                                currentPage === 1
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                              }`}
                              onClick={handlePrevious}
                              disabled={currentPage === 1}
                            >
                              Previous
                            </button>

                            {/* Display current page and total pages */}
                            <span className="text-gray-600 dark:text-gray-300 mx-2">
                              Page {currentPage} of {totalPages}
                            </span>

                            {/* Next Button */}
                            <button
                              className={`px-4 py-2 rounded-md text-white font-semibold ${
                                currentPage === totalPages
                                  ? "bg-gray-400 cursor-not-allowed"
                                  : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                              }`}
                              onClick={handleNext}
                              disabled={currentPage === totalPages}
                            >
                              Next
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>

          <div className="  text-center text-lg font-semibold mt-3">
            Jamalpur Bazar. Copyright sourav@2024
          </div>

          {approvedModalOpen && 
            <Modal
              open={approvedModalOpen}
              onClose={() => setApprovedModalOpen(false)}
              onConfirm={()=> updateProductStatus(productId, "Approved")}
              title="Want to Approved this product ?"
              buttonText={"Yes! Sure"}
              message="If approved this product will be visible from the website and customer app"
              isDelete={isDelete}
            />
          }

          {rejectModalOpen && 
            <Modal
              open={rejectModalOpen}
              onClose={() => setRejectedMoalOpen(false)}
              onConfirm={()=>updateProductStatus(productId, "Rejected")}
              title="Want to Reject this product ?"
              buttonText={"Yes! Sure"}
              message="If reject this product will be not appear website and customer app"
              isDelete={isDelete}
            />
          }
        </div>
      )}
    </>
  );
};

export default PendingProduct;
