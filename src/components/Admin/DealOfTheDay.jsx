import React, { useCallback, useEffect, useState } from 'react';
import flashDeal from "./icon/hot-deal.png";
import Loader from '../../pages/Loader';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import Modal from '../../utils/Modal';
import { AiFillDelete } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Switch } from '@mui/material';

const DealOfTheDay = () => {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [allDeals, setAllDeals] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isDelete, setIsDelete] = useState(false);
  const [searchTearm, setSearchTearm] = useState("")
  const [searchData, setSearchData] = useState(null)
  const [open, setOpen] = useState(false);

  const [dealId, setDealId] = useState("")

  const [publishedModalOpen, setPublishedModalOpen] = useState(false);
  const [publishModalOpentwo, setPublishModaltwo] = useState(false);
  const [isPublished, setIsPublished] = useState()
  const { allProducts } = useSelector(state => state?.products);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${server}/dealsOfTheDay/get-all-dealOfTheday`, { withCredentials: true, }).then((res) => {
      setIsLoading(false);
      setAllDeals(res.data.activeDeals);
    }).catch((error) => {
      setIsLoading(false);
    });
  }, [])


  const handleChange = useCallback((e) => {
    const inputValue = e.target.value;
    setTitle(inputValue.charAt(0).toUpperCase() + inputValue.slice(1));
  }, []);

  const handleProductChange = useCallback((e) => {
    setSelectedProductId(e.target.value); // Update state with the selected product ID
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    const config = {
      withCredentials: true
    };

    try {
      const res = await axios.post(`${server}/dealsOfTheDay/create-dealOfTheDay`, {
        name: title,
        products: [selectedProductId] // Send the product ID(s)
      }, config);

      if (res.data) {
        setIsSubmitting(false);
        toast.success(res.data.message || "Deal of the Day created successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("Failed to create deal");
    }

  }, [title, selectedProductId]);

  useEffect(() => {
    if (searchTearm) {
      const filterDeal = allDeals.filter((deals) =>
        deals.name.toLowerCase().includes(searchTearm.toLowerCase())
      );
      setSearchData(filterDeal);
    } else {
      setSearchData(null);
    }
  }, [searchTearm, allDeals]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterDeal = allDeals.filter((deals) =>
      deals.name.toLowerCase().includes(searchTearm.toLowerCase())
    );
    setSearchData(filterDeal);
  };

  const handleDelete = useCallback(async (id) => {
    try {
      setIsDelete(true)
      const res = await axios.delete(`${server}/dealsOfTheDay/delete-dealOfTheDay/${id}`, { withCredentials: true });
      setIsDelete(false)
      toast.success(res.data.message || "Deal Deleted");

      setOpen(false);
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      toast.error("Error deleting Deal");
      setIsDelete(false)
    }
    finally {
      setIsSubmitting(false)
    }
  }, []);

  const handlePublishedUpdate = async (id) => {
    const res = await axios.put(`${server}/dealsOfTheDay/update-dealOfTheDay-publicStatus/${id}`, { status : isPublished}, { withCredentials: true });
    if (res.data.success) {
        toast.success("Status updated successfully!");
    }

    setTimeout(() => {
        window.location.reload()
    }, 500)
}


  return (
    <div className='w-full 800px:p-5 p-2 bg-gray-200'>
      <div className='flex items-center gap-2'>
        <img src={flashDeal} alt='layout' className='h-5' />
        <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Deal Of The Day</h3>
      </div>

      <div className="w-full mt-2 bg-white p-3 rounded-md">
        {
          isSubmitting ? (
            <div className='w-full h-full flex items-start justify-center'>
              <Loader />
            </div>
          ) : (
            <div className='items-center justify-around grid grid-cols-1  gap-4'>
              <div className="p-4 rounded-md">
                <form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-lg font-medium text-gray-700">Title *</label>
                    <input
                      type="text"
                      name="title"
                      placeholder="Enter title"
                      autoComplete="title"
                      required
                      value={title}
                      onChange={handleChange}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-base placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                  </div>

                  <div className="flex mb-4 flex-col">
                    <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Product *</label>
                    <select
                      id="main_category_select"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      value={selectedProductId}
                      onChange={handleProductChange} // Handle the product selection
                    >
                      <option value="" disabled>Select a Product</option>

                      {allProducts?.map(product => (

                        <option key={product._id} value={product._id}>
                          {product.name}
                        </option>
                      ))}
                    </select>
                  </div>

                </form>
              </div>

            </div>
          )
        }
        <div className='mt-3 flex items-center justify-center'>
          <button
            onClick={handleSubmit}
            type="submit"
            className={`text-white w-[20vw] bg-blue-400 hover:bg-blue-500 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isSubmitting && "cursor-not-allowed"}`}
          >
            Submit
          </button>
        </div>
      </div>

      <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md'>
        <div className='flex items-center 800px:justify-between flex-col 800px:flex-row gap-3 800px:gap-0 '>
          <div className='flex items-center  '>
            <div className='text-[20px] font-medium text-slate-700'>Deals of the day: {allDeals?.length}</div>
          </div>

          <div className='mt-2 flex items-center justify-center'>
            <div className="w-120 bg-white  shadow-lg ">
              <form className="flex items-center justify-center p-2">
                <input
                  type="text"
                  placeholder="Search by Title "
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
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 ">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            #
                          </th>

                          <th scope="col" className="pl-12 pr-12 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            Title
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            Product Name
                          </th>

                          <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 dark:text-gray-400 whitespace-nowrap">
                            Status
                          </th>

                          <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {(searchData || allDeals)?.length > 0 ? (searchData || allDeals).map((deals, index) => (
                          <tr key={index}>
                            <td className="px-2 py-4 text-sm font-medium  ">
                              <div className='text-center'>
                                <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                              </div>
                            </td>

                            <td className="px-4  py-2 fw-full ">
                              <div className="w-full flex items-center justify-center flex-col gap-x-3">
                                <h2 className="font-medium text-[14px] text-gray-600 dark:text-white ">{deals?.name}</h2>

                              </div>
                            </td>

                            <td className="px-4 py-4 text-sm ">
                              <div className='text-center'>
                                <h4 className="text-gray-700 dark:text-gray-200">{deals?.products?.name}</h4>
                              </div>
                            </td>







                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {
                                deals?.status ? (
                                  <div className="flex items-center mt-3">
                                    <Switch
                                      checked={deals?.status}

                                      onClick={() => { setPublishedModalOpen(true); setIsPublished(false); setDealId(deals?._id) }}
                                      color="primary"
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />

                                  </div>
                                ) : (
                                  <div className="flex items-center mt-3">
                                    <Switch
                                      checked={deals?.status}
                                      onChange={() => setIsPublished(true)}
                                      onClick={() => { setPublishModaltwo(true); setDealId(deals?._id) }}
                                      color="secondary"
                                      inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                  </div>
                                )
                              }
                            </td>

                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className='flex items-center justify-end'>
                                <div className='w-full mt-4 flex items-center justify-center gap-2 bg-white  '>
                                  <button
                                    className="text-xl border-2 rounded-md p-1 border-blue-400 transition-colors duration-200"
                                    onClick={() => { setOpen(true); setDealId(deals?._id) }}
                                  >
                                    <AiFillDelete className="text-red-500" />
                                  </button>



                                </div>
                              </div>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No Coupon found</td>
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

      <div className="  text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => handleDelete(dealId)}
        title="Delete Confirmation"
        message="Are you sure you want to delete this Deal?"
        isDelete={isDelete}
        buttonText={'Delete'}
      />

{
                publishedModalOpen && (
                    <Modal
                        open={publishedModalOpen}
                        onClose={() => setPublishedModalOpen(false)}
                        onConfirm={() => handlePublishedUpdate(dealId)}
                        title="Want to Turn OFF Deals Status"
                        message="If disabled this banner will be hidden from the website and customer app"
                        isDelete={isDelete}
                        buttonText="Update"
                    />
                )
            }

            {
                publishModalOpentwo && (
                    <Modal
                        open={publishModalOpentwo}
                        onClose={() => setPublishModaltwo(false)}
                        onConfirm={() => handlePublishedUpdate(dealId)}
                        title="Want to Turn ON Deals Status"
                        message="If turn on, this banner will be visible from the website and customer app"
                        isDelete={isDelete}
                        buttonText="Update"
                    />
                )
            }
    </div>
  )
}

export default DealOfTheDay;