
import React, { useCallback, useEffect, useState } from 'react';
import productIcon from "./icon/package-box.png";
import Loader from '../../pages/Loader';
import { useSelector } from 'react-redux';
import Select from "react-select";
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import { server } from '../../server';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import Modal from '../../utils/Modal';

const FeatureDealAddProduct = () => {
    const { allProducts } = useSelector(state => state?.products);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDeal, setSelectedDeal] = useState({});
    const [open, setOpen] = useState(false);
    const { id } = useParams();
    const [productId, setProductId] = useState("");
    const [isDelete, setIsDelete] = useState(false);

    useEffect(() => {
        axios.get(`${server}/featureDeal/get-featureDeal/${id}`, { withCredentials: true })
            .then(res => {
                setIsLoading(false);
                setSelectedDeal(res.data.featureDeal);
            })
            .catch(error => {
                setIsLoading(false);
                toast.error("Failed to load flash deal");
            });
    }, [id]);


    const productOptions = allProducts.filter(product => !selectedProducts.some(selected => selected.value === product._id))
        .map(product => ({
            value: product._id,
            label: (
                <div className="flex items-center">
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="w-15 h-20 mr-4"
                    />
                    <div>
                        <div>{product.name}</div>
                        <div className="text-gray-500">Shop name: {product.shop.name}</div>
                        <div className="text-green-600">Price: {product.originalPrice} ₹</div>
                    </div>
                </div>
            ),
            data: product
        }));

    const handleChange = selectedOption => {
        setSelectedProducts(prevSelected => [...prevSelected, selectedOption]);
    };

    const handleRemove = productToRemove => {
        setSelectedProducts(prevSelected =>
            prevSelected.filter(product => product.value !== productToRemove.value)
        );
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await axios.put(`${server}/featureDeal/update-featureDeal/${id}`, {
                products: [...selectedDeal.products, ...selectedProducts.map(product => product.data)],
            }, { withCredentials: true });

            toast.success("Product added successfully!");
            setSelectedProducts([]); // Clear the selected products after submitting
            setSelectedDeal(prevDeal => ({
                ...prevDeal,
                products: [...prevDeal.products, ...selectedProducts.map(product => product.data)]
            }));
        } catch (error) {
            toast.error("Failed to add product");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = useCallback(async () => {
        setIsSubmitting(true);
        try {
            const res = await axios.put(`${server}/featureDeal/remove-product/${id}/${productId}`, {}, { withCredentials: true });
            toast.success(res.data.message || "Product removed from flash deal");

            setSelectedDeal(prevDeal => ({
                ...prevDeal,
                products: prevDeal.products.filter(product => product._id !== productId)
            }));

            setOpen(false);
        } catch (error) {
            toast.error("Error deleting flash deal product");
        } finally {
            setIsSubmitting(false);
            setIsDelete(false);
        }
    }, [id, productId]);
    return (
        <div className='w-full 800px:p-5 p-2 bg-gray-200'>
            <div className='flex items-center gap-2'>
                <img src={productIcon} alt='layout' className='h-5' />
                <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">Add product</h3>
            </div>

            <div className="w-full mt-2 bg-white p-3 rounded-md">
                {isLoading ? (
                    <div className='w-full h-full flex items-center justify-center'><Loader /></div>
                ) : (
                    <>
                        <div className='items-center justify-around gap-4'>
                            <div className="p-4 rounded-md">
                                <Select
                                    options={productOptions}
                                    onChange={handleChange}
                                    value={null} // This ensures the input field is cleared after selection
                                    placeholder="Search by product name..."
                                    className="w-full"
                                    classNamePrefix="react-select"
                                    isClearable
                                />
                                {selectedProducts?.length > 0 && (
                                    <div className="mt-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 border rounded-md">
                                        {selectedProducts.map(product => (
                                            <div key={product.value} className='mt-2 m-1 p-2 border rounded-md border-blue-600 flex justify-between'>
                                                <div>{product.label}</div>
                                                <div
                                                    onClick={() => handleRemove(product)}
                                                    className="cursor-pointer text-red-600 hover:text-red-800">
                                                    <FaTimes />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='mt-3 flex items-center justify-center'>
                            <button
                                onClick={handleSubmit}
                                type="submit"
                                className={`text-white w-[20vw] bg-blue-700 hover:bg-blue-800 font-semibold text-center border rounded-md py-2 px-5 flex items-center justify-center ${isSubmitting && "cursor-not-allowed"}`}
                                disabled={isSubmitting}
                            >
                                Submit
                            </button>
                        </div>
                    </>
                )}
            </div>

            <div className='w-full mt-2 bg-white p-3 rounded-md gap-2'>
                <div className=' '>
                    <div className='flex items-center justify-center '>
                        <div className='text-[20px] font-medium text-slate-700 text-center'>Product table</div>
                    </div>
                </div>

                <div className='w-full bg-white'>
                    <section className="container px-4 mt-2">
                        <div className="flex flex-col mt-6">
                            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                            <thead className="bg-gray-50 dark:bg-gray-800">
                                                <tr>
                                                    <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        SL
                                                    </th>

                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Name
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Shop
                                                    </th>
                                                    <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center text-gray-500 dark:text-gray-400 whitespace-nowrap">
                                                        Price
                                                    </th>
                                                    <th scope="col" className="relative py-3.5 px-4 whitespace-nowrap">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                                {selectedDeal && selectedDeal?.products?.length > 0 ?
                                                    selectedDeal?.products?.map((product, index) => (

                                                        <tr key={product._id}>
                                                            <td className="px-2 py-4 text-sm font-medium text-center">
                                                                <h2 className="font-medium text-gray-800 dark:text-white">{index + 1}</h2>
                                                            </td>
                                                            <td className="px-4 py-2 flex justify-center items-center">
                                                                <img className="object-cover w-10 h-10 rounded-full" src={product?.images[0]?.url} alt={product?.name} />
                                                            </td>
                                                            <td className="px-4 py-2 text-center">
                                                                <h2 className="font-medium text-gray-800 dark:text-white">{product?.name?.length > 30 ? product?.name.slice(0, 29) + "..." : product?.name}</h2>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-center">
                                                                <h4 className="text-gray-700 dark:text-gray-200">{product?.shop?.name}</h4>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-center">
                                                                <h4 className="text-gray-700 dark:text-gray-200">{product?.originalPrice} ₹</h4>
                                                            </td>
                                                            <td className="px-4 py-4 text-sm text-center">
                                                                <button
                                                                    className="text-xl border-2 rounded-md p-1 border-blue-400 transition-colors duration-200"
                                                                    onClick={() => { setOpen(true); setProductId(product?._id); }}
                                                                >
                                                                    <AiFillDelete className="text-red-500" />
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )) : (<tr>
                                                        <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">No Deals found</td>
                                                    </tr>)
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>

            <Modal
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={handleDelete}
                title="Delete Confirmation"
                message="Are you sure you want to delete this product from Feature deal?"
                isDelete={isDelete}
                buttonText={'Delete'}
            />
        </div>
    )
}

export default FeatureDealAddProduct