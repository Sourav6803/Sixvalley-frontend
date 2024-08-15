
import React from 'react';
import Loader from '../pages/Loader'

const Modal = ({ open, onClose, onConfirm, title, message, isDelete, buttonText }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>
            {
                isDelete ? (<div className='w-full flex items-center justify-center'>
                    <Loader />
                </div>) : (
                    <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                        <div className="bg-white p-6">
                            <div className="text-center">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    {title}
                                </h3>
                                <div className="mt-2">
                                    <p className=" text-gray-500 font-medium text-base">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex items-center justify-center gap-3">
                            <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent text-white shadow-sm px-4 py-2 bg-blue-700  text-base font-medium  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={onConfirm}
                            >
                                {buttonText}
                            </button>
                            <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300  shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Modal;