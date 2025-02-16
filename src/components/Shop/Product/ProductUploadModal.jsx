
import { MdClose, MdInfo } from "react-icons/md";
import { RxAvatar } from "react-icons/rx";

const ProductUploadModal = ({ isOpen, onClose, image, setProductFormOpen, setImgModalOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black opacity-50"></div>

      {/* Modal */}
      <div className="bg-white rounded-lg shadow-lg transform transition-all sm:max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto relative p-6">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>

        {/* Header */}
        <h2 className="text-lg font-semibold text-gray-800">
          Products in a Catalog
        </h2>
        <p className="text-sm text-gray-600 mt-1">
          Please add only the front image of your product. If you want to add
          multiple images, you can do it in the next step.
        </p>

        {/* Guidelines Alert */}
        <div className="mt-4 p-2 rounded-md bg-yellow-200 flex items-center gap-2">
          <MdInfo className="text-yellow-500" />
          <p className="text-xs text-gray-700">
            You can add a minimum of 1 and a maximum of 5 products to create a
            Product.
          </p>
        </div>

        {/* Image Preview */}
        <div className="mt-4 flex flex-col items-center">
          {image ? (
            <div className="relative w-24 h-24">
              <img
                src={URL.createObjectURL(image)}
                alt="avatar"
                className="h-full w-full object-cover rounded-full"
              />
            </div>
          ) : (
            <RxAvatar className="h-8 w-8" />
          )}
        </div>

        {/* Image Guidelines */}
        <div className="mt-4">
          <h3 className="text-base font-semibold text-gray-800">
            Image types which are not allowed
          </h3>
          <ul className="text-sm text-gray-600 grid grid-cols-2 gap-2 mt-2">
            {[
              "Watermark image",
              "Fake branded/1st copy",
              "Image with price",
              "Pixelated image",
              "Inverted image",
              "Blurred image",
              "Incomplete image",
              "Stretched/shrunk image",
              "Image with props",
              "Image with text",
            ].map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-red-500">✕</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button onClick={()=> {setProductFormOpen(true); setImgModalOpen(false)}} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductUploadModal;
