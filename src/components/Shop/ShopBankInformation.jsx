



import axios from 'axios';
import React, { useState } from 'react';
import { FaLock, FaInfoCircle, FaCheckCircle, FaShieldAlt, FaTimesCircle } from 'react-icons/fa';
import { server } from "../../server";
import { toast } from 'react-toastify';
import { loadSeller } from '../../redux/actions/user';
import { useDispatch, useSelector } from 'react-redux';

const ShopBankInformation = ({ initialData }) => {
    const [bankName, setBankName] = useState(initialData?.bankName || '');
    const [accountHolder, setAccountHolder] = useState(initialData?.accountHolder || '');
    const [accountNumber, setAccountNumber] = useState(initialData?.accountNumber || '');
    const [ifsc, setIfsc] = useState(initialData?.ifsc || '');
    const [bankAddress, setBankAddress] = useState(initialData?.bankAddress || '');
    const [country, setCountry] = useState(initialData?.country || '');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [errors, setErrors] = useState({});
    const [showAddBankModal, setShowAddBankModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBankId, setSelectedBankId] = useState(null);

    const { seller } = useSelector((state) => state.seller);

    const [showAddBankForm, setShowAddBankForm] = useState(false);

    const handleAddBankClick = () => {
        setShowAddBankModal(true);
    };

    const handleCancel = () => {
        setShowAddBankForm(false);
    };

    const handleDeleteBankClick = (bankId) => {
        setSelectedBankId(bankId);
        setShowDeleteModal(true);
    };

    const handleDeleteBank = () => {
        //  Logic to delete the bank account using`selectedBankId`
        setShowDeleteModal(false);
        console.log(`Bank account with ID ${selectedBankId} deleted.`);
    };

    //  List of valid bank names
    const validBankNames = [
        "State Bank of India (SBI)",
        "HDFC Bank",
        "ICICI Bank",
        "Axis Bank",
        "Punjab National Bank (PNB)",
        "Kotak Mahindra Bank",
        "IndusInd Bank",
        "Bank of Baroda",
        "Canara Bank",
        "Union Bank of India",
        "IDFC First Bank",
        "Indian Bank",
        "Yes Bank",
        "IDBI Bank",
        "Central Bank of India",
        "UCO Bank",
        "Bank of India (BOI)",
        "Indian Overseas Bank",
        "Punjab & Sind Bank",
        "RBL Bank",
        "Federal Bank",
        "South Indian Bank",
        "Karur Vysya Bank",
        "Tamilnad Mercantile Bank",
        "Bandhan Bank",
        "Dhanlaxmi Bank",
        "Jammu & Kashmir Bank",
        "Karnataka Bank",
        "City Union Bank",
        "Lakshmi Vilas Bank",
        "Suryoday Small Finance Bank",
        "Ujjivan Small Finance Bank",
        "AU Small Finance Bank",
        "Equitas Small Finance Bank",
        "ESAF Small Finance Bank",
        "Fincare Small Finance Bank",
        "Jana Small Finance Bank",
        "North East Small Finance Bank",
        "Capital Small Finance Bank"
        
    ];

    const dispatch = useDispatch();

    //  Function to validate the form
    const validateForm = () => {
        const newErrors = {};

        
        if (!validBankNames.includes(bankName)) {
            newErrors.bankName = 'Please select a valid bank name.';
        }

        //  Validate Account Number Length(assuming 9 to 18 digits)
        if (accountNumber.length < 9 || accountNumber.length > 18) {
            newErrors.accountNumber = 'Account number must be between 9 and 18 digits.';
        }

        //  Additional validations can be added here

        setErrors(newErrors);

        //  Return true if no errors
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const bankInfo = {
                bankName,
                accountHolder,
                accountNumber,
                ifsc,
                bankAddress,
                country,
            };
            //  Send this bankInfo to the backend securely
            console.log("Bank Info Submitted: ", bankInfo);
            await axios
                .put(
                    `${server}/shop/bank`,
                    {
                        bankName,
                        accountHolder,
                        accountNumber,
                        ifsc,
                        bankAddress,
                        country,
                    },
                    { withCredentials: true }
                )
                .then((res) => {
                    toast.success("Bank Added succesfully!");
                    dispatch(loadSeller());
                })
                .catch((error) => {
                    toast.error(error.response.data.message);
                });
            setShowConfirmation(true);  
             
        }
    };



    return (





        <div className="w-full min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Bank Information</h2>

            {/* Add Bank Account Button */}
            <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 mb-6"
                onClick={handleAddBankClick}
            >
                Add Bank Account
            </button>

            {/* Bank Information Section */}
            {seller && seller?.bankInfo ? seller?.bankInfo.map((bankInfo) => (
                <div key={bankInfo.id} className="bg-white w-full max-w-xl p-6 shadow-lg rounded-lg mb-8">
                    <h3 className="text-xl font-semibold text-blue-600 mb-4">Bank Details</h3>
                    <div className="text-gray-700 space-y-2">
                        <p><span className="font-medium">Bank Name:</span> {bankInfo.bankName}</p>
                        <p><span className="font-medium">Account Number:</span> {bankInfo.accountNumber.replace(/\d(?=\d{4})/g, "*")}</p>
                        <p><span className="font-medium">IFSC Code:</span> {bankInfo.ifsc}</p>
                        <p><span className="font-medium">Bank Address:</span> {bankInfo.bankAddress}</p>
                    </div>

                    <div className="mt-6 flex justify-between items-center">
                        <div className="text-green-600 flex items-center space-x-2">
                            <FaLock className="text-lg" />
                            <span>Your information is securely encrypted</span>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                onClick={() => handleDeleteBankClick(bankInfo.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                                onClick={handleAddBankClick}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )) : (
                <div className="bg-white w-full max-w-xl p-6 shadow-lg rounded-lg mb-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">No Bank Information Available</h3>
                    <p className="text-gray-600 mb-4">Please add your bank details to ensure smooth transactions.</p>
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        onClick={handleAddBankClick}
                    >
                        Add Bank Account
                    </button>
                </div>
            )}

            {/* Add/Update Bank Account Modal */}
            {showAddBankModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white w-[85vw] h-[90vh] overflow-y-auto  max-w-md p-8 shadow-lg rounded-lg relative">
                        <FaTimesCircle
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-600 cursor-pointer text-2xl"
                            onClick={() => setShowAddBankModal(false)}
                        />
                        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Secure Bank Information</h2>

                        <form onSubmit={handleSubmit}>
                            {/* Bank Name */}
                            {/* Bank Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Bank Name</label>
                                <select
                                    value={bankName}
                                    onChange={(e) => setBankName(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg ${errors.bankName ? 'border-red-500' : 'border-gray-300'}`}
                                    required
                                >
                                    <option value="" disabled>Select Bank</option>
                                    {validBankNames.map((bank) => (
                                        <option key={bank} value={bank}>{bank}</option>
                                    ))}
                                </select>
                                {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName}</p>}
                            </div>

                            {/* Account Holder Name */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Account Holder Name</label>
                                <input
                                    type="text"
                                    value={accountHolder}
                                    onChange={(e) => setAccountHolder(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Account Holder Name"
                                    required
                                />
                            </div>

                            {/* Account Number */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Account Number</label>
                                <input
                                    type="text"
                                    value={accountNumber}
                                    onChange={(e) => setAccountNumber(e.target.value)}
                                    className={`w-full px-4 py-2 border rounded-lg ${errors.accountNumber ? 'border-red-500' : 'border-gray-300'}`}
                                    placeholder="Enter Account Number"
                                    required
                                    maxLength={18}
                                    pattern="\d{9,18}"
                                    title="Account number must be between 9 and 18 digits."
                                />
                                {errors.accountNumber && <p className="text-red-500 text-sm mt-1">{errors.accountNumber}</p>}
                            </div>

                            {/* IFSC Code */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">IFSC Code</label>
                                <input
                                    type="text"
                                    value={ifsc}
                                    onChange={(e) => setIfsc(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter IFSC Code"
                                    required
                                />
                            </div>

                            {/* Bank Address */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Bank Address</label>
                                <input
                                    type="text"
                                    value={bankAddress}
                                    onChange={(e) => setBankAddress(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    placeholder="Enter Bank Address"
                                    required
                                />
                            </div>

                            {/* Country */}
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium">Country</label>
                                <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                >
                                    <option value="" disabled>Select Country</option>
                                    <option value="USA">USA</option>
                                    <option value="India">India</option>
                                    <option value="UK">UK</option>
                                </select>
                            </div>

                            {/* Other form fields like Account Holder Name, Account Number, etc... */}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Save Bank Information
                            </button>

                            {/* Security Information */}
                            <div className="mt-6 flex justify-center items-center text-gray-600 space-x-2">
                                <FaShieldAlt className="text-xl" />
                                <span>Your bank information is protected with advanced encryption</span>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white w-full max-w-sm p-6 shadow-lg rounded-lg text-center">
                        <h3 className="text-xl font-bold text-red-600 mb-4">Are you sure?</h3>
                        <p className="text-gray-700 mb-6">Do you really want to remove your bank account? This action cannot be undone.</p>
                        <div className="flex justify-between items-center space-x-4">
                            <button
                                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                                onClick={handleDeleteBank}
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default ShopBankInformation;
