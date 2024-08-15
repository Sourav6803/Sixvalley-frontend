import React from 'react';

const ImageModal = ({ open, onClose, image }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="fixed inset-0 bg-black opacity-50"></div>

            <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-[90vw] max-h-[90vh] w-full sm:w-auto">
                <div className="bg-white p-3 flex justify-center items-center">
                    <img
                        alt="Selected"
                        className="h-[70vh] md:h-[75vh] max-h-full w-full object-fit"
                        src={image}
                    />
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse flex items-center justify-end gap-3">
                    <button
                        type="button"
                        className="mt-1 inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageModal;
