import React, { useCallback, useEffect, useState } from "react";
import {  AiOutlineEye, AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
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


const AllProducts = () => {
  const { products, isLoading } = useSelector((state) => state?.products);
  const { allBrand } = useSelector((state) => state.brand);

  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getAllProductsShop(seller._id));
  }, [dispatch, seller?._id]);

  const { allCategory } = useSelector((state) => state?.category);
  const { allSubCategory } = useSelector((state) => state?.subCategory);
  const { allSubSubCategory } = useSelector((state) => state?.subSubCategory);


  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [priority, setPriority] = useState();
  const [mainCategory, setMainCategory] = useState("")
  const [subCategory, setSubCategory] = useState("")
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [allCategories, setAllCategories] = useState([]);
  const [allSubCategories, setAllSubCategories] = useState([]);
  const [allSubSubCategories, setAllSubSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [searchTearm, setSearchTearm] = useState("")
  const [searchData, setSearchData] = useState(null)
  const [brand, setBrand] = useState("")
  const [productId, setProductId] = useState("")
  const [isActive, setIsActive] = useState("")

  const [isActiveModalOpen, setIsActiveModalOpen] = useState(false)
  const [isActiveModalTwoOpen, setIsActiveModalTwoOpen] = useState(false)

  useEffect(() => {
    setAllCategories(allCategory);
  }, [allCategory]);

  useEffect(() => {
    setAllSubCategories(allSubCategory);
  }, [allSubCategory]);

  const handleFileInputChange = useCallback((e) => {
    const file = e.target.files[0];
    setImage(file);
  }, []);


  useEffect(() => {
    if (name.length > 1 && priority && mainCategory && subCategory && image) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [name, priority, mainCategory, subCategory, image]);



  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    if (!name || !priority || !mainCategory || !subCategory || !image) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    const newForm = new FormData();
    newForm.append("name", name);
    newForm.append("priority", priority);
    newForm.append("mainCategory", mainCategory);
    newForm.append("subCategory", subCategory);
    if (image) {
      newForm.append("image", image);
    }

    try {
      dispatch(createSubSubCategory(newForm))
      setIsSubmitting(false);
      setName("");
      setPriority();
      setMainCategory("");
      setSubCategory("")
      setImage(null)
    }
    catch (err) {
      setIsSubmitting(false);
      toast.error(err.message || "Failed to create category.");
    } finally {
      setIsSubmitting(false);
    }
  }, [name, priority, mainCategory, subCategory, dispatch, image]);


  const handleDelete = useCallback(async (id) => {
    try {
      setIsDelete(true)
      const res = await axios.delete(`${server}/subSubCategory/delete-subSubCategory/${id}`, { withCredentials: true });
      setIsDelete(false)
      toast.success(res.data.message || "Sub sub-Category Deleted");
      setAllCategories(allSubSubCategory.filter(cat => cat._id !== id));
      setOpen(false);
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (err) {
      toast.error("Error deleting category");
      setIsDelete(false)
    }
    finally {
      setIsSubmitting(false)
    }
  }, [allSubSubCategory]);

  


  useEffect(() => {
    if (searchTearm) {
      const filterProduct = products.filter((product) =>
        product.name.toLowerCase().includes(searchTearm.toLowerCase())
      );
      setSearchData(filterProduct);
    } else {
      setSearchData(null);
    }
  }, [searchTearm, products]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterProduct = products.filter((product) =>
      product.name.toLowerCase().includes(searchTearm.toLowerCase())
    );
    setSearchData(filterProduct);
  };

  return (
    <>
      {isLoading === true ? (
        <div className='flex items-center justify-center'></div>
      ) : (
        <div className='w-full p-2 md:p-5 bg-gray-200'>
          <div className='flex items-center gap-2'>
            <img src={productImage} alt='layout' className='h-8' />
            <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Product List: {products?.length}</h3>
          </div>

          <div className="w-full mt-2 bg-white p-3 rounded-md hover:shadow-md">
            {
              isLoading ? (<div className='w-full h-full flex items-start justify-center'><Loader /></div>) : (

                <div className="p-4 rounded-md ">
                  <h2 className='my-3 text-[20px] text-gray-600 font-medium'>Filter products </h2>
                  <form className='items-center justify-around grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 '>

                    <div className="flex mb-4 flex-col">
                      <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Brand *</label>
                      <select
                        id="main_category_select"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <option value="" disabled>Select a Brand</option>
                        {allBrand?.map(brand => (
                          <option key={brand.id} value={brand.id}>
                            {brand.brandName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex mb-4 flex-col">
                      <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select"> Category *</label>
                      <select
                        id="main_category_select"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={mainCategory}
                        onChange={(e) => setMainCategory(e.target.value)}
                      >
                        <option value="" disabled>Select a category</option>
                        {allCategory?.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex mb-4 flex-col">
                      <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Sub category *</label>
                      <select
                        id="main_category_select"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                      >
                        <option value="" disabled>Select a sub category</option>
                        {allSubCategory?.map(category => (
                          <option key={category.id} value={category.id}>

                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex mb-4 flex-col">
                      <label className="block text-lg font-medium text-gray-700" htmlFor="main_category_select">Sub Sub category *</label>
                      <select
                        id="main_category_select"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={subCategory}
                        onChange={(e) => setAllSubSubCategories(e.target.value)}
                      >
                        <option value="" disabled>Select a sub sub category</option>
                        {allSubSubCategory?.map(category => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>

                  </form>
                </div>

              )
            }
            <div className='mt-3 flex items-center justify-end'>
              <button onClick={handleSubmit} type="submit" className={`text-white w-[10vw] bg-blue-600 hover:bg-blue-800 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isDisabled && isSubmitting && "cursor-not-allowed"}`}>
                {isSubmitting ? <Loader /> : "Search"}
              </button>
            </div>
          </div>

          <div className='w-full mt-2 bg-white p-3 rounded-md  gap-2 hover:shadow-md'>
            <div className='flex items-center justify-between flex-col md:flex-row gap-2 md:gap-0'>
              <div className='flex items-center text-white   '>
                <div className='bg-blue-700 rounded-md px-3 py-1 flex items-center justify-center gap-1 cursor-pointer' onClick={() => navigate("/dashboard-create-product")}>
                  <AiOutlinePlus />
                  <div className=' '>Add new product</div>
                </div>
              </div>

              <div className='mt-2 flex items-center justify-center'>
                <div className="w-120 bg-white  shadow-lg ">
                  <form className="flex items-center justify-center p-2">
                    <input
                      type="text"
                      placeholder="Search product by name"
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
                                Product Name
                              </th>

                              <th scope="col" className="pl-6 pr-6 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Image
                              </th>

                              <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Price
                              </th>

                              <th scope="col" className="pl-4 pr-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                                Brand
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500  whitespace-nowrap">
                                Category
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500  whitespace-nowrap">
                                Sub Category
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500 whitespace-nowrap">
                                Stock
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-centert text-gray-500  whitespace-nowrap">
                                Sold Out
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500  whitespace-nowrap">
                                Verify Status
                              </th>

                              <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                Active Status
                              </th>

                              <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                                <span className="">Actions</span>
                              </th>
                            </tr>
                          </thead>

                          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                            {(searchData || products)?.length > 0 ? (searchData || products).map((product, index) => (
                              <tr key={index}>

                                <td className="px-2 py-4 text-sm font-medium  ">
                                  <div className='text-center'>
                                    <h2 className="font-medium text-gray-800 dark:text-white ">{index + 1}</h2>
                                  </div>
                                </td>
                                <td className="px-4  py-2 fw-full ">
                                  <div className="w-full flex items-center justify-center  gap-x-3">

                                    <h2 className="font-medium text-gray-800 dark:text-white ">{product?.name?.length > 15 ? product.name.slice(0, 15) + "..." : product?.name}</h2>
                                  </div>
                                </td>

                                <td className="px-2  py-2 w-full ">
                                  <div className="w-full flex items-center justify-center  gap-x-3">
                                    <img className="object-cover w-10 h-10 rounded-full" src={product?.images[0]?.url} alt="Imag" />
                                  </div>
                                </td>

                                <td className="px-2 py-4 text-sm w-[50px]  ">
                                  <div className='text-center'>
                                    <h4 className="text-gray-700 dark:text-gray-200">{product?.afterDiscountPrice}</h4>
                                  </div>
                                </td>

                                <td className="px-4 py-4 w-[50px]  text-sm ">
                                  <div className='text-center'>
                                    <h4 className="text-gray-700 dark:text-gray-200">{product?.brand}</h4>
                                  </div>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.category}</h4>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.subCategory}</h4>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.stock}</h4>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.sold_out}</h4>
                                </td>

                                <td className="px-4 py-4 text-sm whitespace-nowrap">
                                  <h4 className="text-gray-700 text-center dark:text-gray-200">{product?.approved ? product?.approved : "Approved"}</h4>
                                </td>



                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                  {
                                    product?.isActive ? (
                                      <div className="flex items-center mt-3">
                                        <Switch
                                          checked={product?.isActive}

                                          onClick={() => { setIsActiveModalOpen(true); setIsActive(false); setProductId(product?._id) }}
                                          color="primary"
                                          inputProps={{ 'aria-label': 'controlled' }}
                                        />

                                      </div>
                                    ) : (
                                      <div className="flex items-center mt-3">
                                        <Switch
                                          checked={product?.isActive}
                                          onChange={() => setIsActive(true)}
                                          onClick={() => { setIsActiveModalTwoOpen(true); setProductId(product?._id) }}
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
                                        className="text-xl border-2 rounded-md p-1 border-blue-700 hover:bg-blue-600 hover:text-white transition-colors duration-200"
                                        onClick= { () => navigate(`/dashboard/product-view/${product._id}`) }
                                      >
                                        <AiOutlineEye className="text-blue-500 hover:text-white" />
                                      </button>

                                      <button
                                        className="text-xl border-2 rounded-md p-1 border-red-500 transition-colors duration-200"
                                        onClick={() => { setOpen(true); setCategoryId(product?._id) }}
                                      >
                                        <AiFillDelete className="text-red-500" />
                                      </button>

                                      <Link to={`/admin/dashboard/product/update/${product?._id}`}>
                                        <button className="text-gray-500 border-2 rounded-md p-1 border-blue-400 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none">
                                          <svg xmlns="http://www.w3.org/2000/svg" color='blue' fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                          </svg>
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

          <div className="  text-center text-lg font-semibold mt-3">Jamalpur Bazar. Copyright sourav@2024</div>

          {
            isActiveModalOpen &&
            <Modal
              open={setIsActiveModalOpen}
              onClose={() => setIsActiveModalOpen(false)}
              onConfirm={() => handleDelete(productId)}
              title="Want to turn of Active status of your product ?"
              buttonText={"Yes! Sure"}
              message="If disabled this product will be hidden from the website and customer app"
              isDelete={isDelete}
            />}

          {
            isActiveModalTwoOpen &&
            <Modal
              open={setIsActiveModalTwoOpen}
              onClose={() => setIsActiveModalTwoOpen(false)}
              onConfirm={() => handleDelete(productId)}
              title="Want to turn of Active status of your product "
              buttonText={"Yes! Sure"}
              message="If active this product will be show on the website and customer app"
              isDelete={isDelete}
            />}
        </div>
      )}
    </>
  );
};

export default AllProducts;