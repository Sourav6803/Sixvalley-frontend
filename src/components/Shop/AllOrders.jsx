// import { Button } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import Button from '@mui/material/Button'
import { DataGrid } from "@material-ui/data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import { AiOutlineArrowRight, AiOutlineDownload } from "react-icons/ai";
import { AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { getAllProductsShop } from "../../redux/actions/product";
import axios from "axios";
import { server } from '../../server';
import { toast } from 'react-toastify';
import Loader from '../../pages/Loader';
import Modal from '../../utils/Modal';
import { AiFillDelete } from "react-icons/ai";
import { createSubSubCategory } from '../../redux/actions/subSubCategory';
import productImage from "./icon/package-box.png"
import { Switch } from '@mui/material';

const AllOrders = () => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);
  const [isDelete, setIsDelete] = useState(false);
  const [searchTearm, setSearchTearm] = useState("")
  const [searchData, setSearchData] = useState(null)
  console.log(orders)

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item._id,
        itemsQty: item.cart.length,
        total: "₹" + item.totalPrice,
        status: item.status,
      });
    });

  // const handleDelete = useCallback(async (id) => {
  //   try {
  //     setIsDelete(true)
  //     const res = await axios.delete(`${server}/subSubCategory/delete-subSubCategory/${id}`, { withCredentials: true });
  //     setIsDelete(false)
  //     toast.success(res.data.message || "Sub sub-Category Deleted");
  //     setAllCategories(allSubSubCategory.filter(cat => cat._id !== id));
  //     setOpen(false);
  //     setTimeout(() => {
  //       window.location.reload()
  //     }, 1000)
  //   } catch (err) {
  //     toast.error("Error deleting category");
  //     setIsDelete(false)
  //   }
  //   finally {
  //     setIsSubmitting(false)
  //   }
  // }, [allSubSubCategory]);

  function formatMongoDate(date) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    return `${day}${daySuffix(day)} ${month}, ${year}`;

  }

  function extractTimeFromDate(mongoDate) {
    if (!(mongoDate instanceof Date)) {
      throw new Error("Invalid date. Please provide a valid MongoDB Date object.");
    }

    // Extract hours and minutes
    let hours = mongoDate.getHours();
    const minutes = String(mongoDate.getMinutes()).padStart(2, '0');

    // Determine AM/PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    // Format the time as hh:mm AM/PM
    const formattedTime = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
    return formattedTime;

  }

  useEffect(() => {
    if (searchTearm) {
      const filterProduct = orders?.filter((order) =>
        order.name.toLowerCase().includes(searchTearm.toLowerCase())
      );
      setSearchData(filterProduct);
    } else {
      setSearchData(null);
    }
  }, [searchTearm, orders]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterProduct = orders.filter((order) =>
      order.name.toLowerCase().includes(searchTearm.toLowerCase())
    );
    setSearchData(filterProduct);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center"><Loader /></div>
      ) : (


        <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md'>
          <div className='flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0'>
            <div className='flex items-center text-white   '>
              <div className='bg-blue-700 rounded-md px-3 py-1 flex items-center justify-center gap-1 cursor-pointer' onClick={() => navigate("/dashboard-create-product")}>

                <div className=''>Order List : {orders?.length}</div>
              </div>
            </div>

            <div className='mt-2 flex items-center justify-center'>
              <div className="w-120 bg-white  shadow-lg ">
                <form className="flex items-center justify-center p-2">
                  <input
                    type="text"
                    placeholder="Search order by name"
                    value={searchTearm}
                    onChange={(e) => setSearchTearm(e.target.value)}
                    className="w-full rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                  />
                  <button type="submit" onClick={handleSearch}
                    className="bg-blue-800 text-white rounded-md px-4 py-1 ml-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className='w-full  bg-white '>
            <section className="container px-4 mt-2 ">

              <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 ">
                          <tr>
                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              SL
                            </th>

                            <th scope="col" className="pl-8 pr-8 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              Order Id
                            </th>

                            <th scope="col" className="pl-8 pr-8 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              Order Date
                            </th>

                            <th scope="col" className="pl-6 pr-6 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              Customr Info
                            </th>

                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              Total amount
                            </th>

                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                              Payment Method
                            </th>

                            <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                              Order Status
                            </th>





                            <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                              <span className="">Actions</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                          {(searchData || orders)?.length > 0 ? (searchData || orders).map((order, index) => (
                            <tr key={index}>

                              <td className="px-2 py-4 text-sm font-medium  ">
                                <div className='text-center'>
                                  <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                                </div>
                              </td>

                              <td className="px-2 py-4 text-sm w-[50px]  ">
                                <div className='text-center'>
                                  <h4 className="text-gray-700 dark:text-gray-200">{order?._id}</h4>
                                </div>
                              </td>

                              <td className="px-4  py-2 w-[50px]  ">
                                <div className="w-full gap-x-1 flex flex-col">


                                  <h2 className="font-medium text-gray-600 dark:text-white ">{formatMongoDate(new Date(order?.createdAt))}</h2>
                                  <h2 className="text-gray-600">{extractTimeFromDate(new Date(order?.createdAt))}</h2>
                                </div>
                              </td>



                              <td className="px-4 py-2 text-sm w-[50px]  ">
                                <div className='text-center flex flex-col gap-x-2'>
                                  <h4 className="text-gray-700 dark:text-gray-200">{order?.user?.name?.length > 9 ? order?.user?.name.slice(0, 9) + "..." : order?.user?.name}</h4>
                                  <h4 className="text-gray-700 dark:text-gray-200">{order?.user?.phoneNumber}</h4>
                                </div>
                              </td>

                              <td className="px-4 py-4 w-[50px]  text-sm ">
                                <div className='text-center  flex flex-col gap-x-2 '>
                                  <h4 className="text-gray-700 dark:text-gray-200">₹{order?.totalPrice}</h4>
                                  <p>{order?.paymentInfo?.type === "Cash On Delivery" ? <span className="px-1 bg-red-100 py-[1px] font-[600] border rounded-md border-red-200 text-red-500 text-[10px]">Unpaid</span> : <span className="px-1 py-[1px] bg-green-100 rounded-md border border-green-200 text-green-500 text-[10px]">paid</span>}</p>
                                </div>
                              </td>

                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <h4 className="text-gray-700 text-center dark:text-gray-200">{order?.paymentInfo?.type}</h4>
                              </td>

                              <td className="px-2 py-4  text-sm whitespace-nowrap w-[80px] ">
                                <span className={`text-gray-700 text-center dark:text-gray-200 rounded-md 
                                    ${(order?.status === "Returned" ||
                                    order?.status === "Cancled" ||
                                    order?.status === "Failed To Delivery" ||
                                    order?.status === "Refund Success"
                                  )
                                    ? "border border-red-500 bg-red-100  text-red-500 font-semibold rounded-md px-2 py-[1px]"
                                    : "border border-green-500 px-2 bg-green-100 font-semibold rounded-md text-green-500"}`}>{order?.status}</span>
                              </td>

                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <div className='flex items-center justify-end'>
                                  <div className='w-full mt-4 flex items-center justify-center gap-2 bg-white  '>

                                    <button
                                      className="text-xl border-2 rounded-md p-1 border-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                    // onClick={() => navigate(`/dashboard/product-view/${product._id}`)}
                                    >
                                      <AiOutlineEye className="text-blue-500 hover:text-white" onClick={()=>navigate(`/order/${order?._id}`)} />
                                    </button>

                                    <Link to={`/admin/dashboard/product/update/${order?._id}`}>
                                      <button className="text-gray-500 border-2 rounded-md p-1 border-blue-400 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                        <AiOutlineDownload size={20} />
                                      </button>
                                    </Link>

                                  </div>
                                </div>
                              </td>

                            </tr>
                          )) : (
                            <tr>
                              <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No categories found</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default AllOrders;


{/* <div className="w-full mx-2 pt-1 mt-5 bg-gray-200">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          />
        </div> */}