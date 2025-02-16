





// import { FaQuestionCircle } from "react-icons/fa";

// const GeneralInfo = ({
  
//   maxPurchaseLimit,
//   setMaxPurchaseLimit,
//   dimensions,
//   handleDimensionChange,
//   isDimensionOpen,
//   setIsDimensionOpen,
//   warrantyPeriod,
//   setWarrantyPeriod,
//   description,
//   setDescription,
//   brand,
//   setBrand,
//   tags,
//   setTags,
//   importerDetails,
//   setImporterDetails, 
//   handleInputChange,
//   errors
// }) => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-6 p-2 bg-white rounded-lg shadow-lg">
      
//       <InputField  label="Max Purchase Limit" value={maxPurchaseLimit} onChange={handleInputChange(setMaxPurchaseLimit, "maxPurchaseLimit")} placeholder="Ex. 3" type="number" max={5} min={1} />
      
//       <DimensionField
//         isOpen={isDimensionOpen}
//         setIsOpen={setIsDimensionOpen}
//         dimensions={dimensions}
//         handleDimensionChange={handleDimensionChange}
        
//       />
      
//       <SelectField
//         label="Warranty Period"
//         value={warrantyPeriod}
//         onChange={setWarrantyPeriod}
//         options={["No warranty", "3 Month", "6 Month", "1 year"]}
//       />
      
//       <InputField label="Description" value={description} onChange={handleInputChange(setDescription, "description")} placeholder="Enter description..." />
//       <InputField label="Brand" value={brand} onChange={setBrand} placeholder="Enter Brand..." />
//       <SearchTagsField value={tags} onChange={setTags} />
//       {/* New Importer Details Field */}
//       <ImporterDetailsField value={importerDetails} setImporterDetails={setImporterDetails}  handleInputChange={handleInputChange} errors={errors} />
//     </div>
//   );
// };

// const InputField = ({ label, value, onChange, placeholder, type = "text", errors, ...rest  }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     <span className="text-red-500">*</span>
//     <input
//       type={type}
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder={placeholder}
//       className="mt-2 block w-full text-xs px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//       {...rest}
//     />
//     {errors.maxPurchaseLimit && <p className="text-red-500 text-sm">{errors.maxPurchaseLimit}</p>}
//   </div>
// );

// // Importer Details Field Component
// const ImporterDetailsField = ({ value, setImporterDetails, handleInputChange, errors }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-700">Importer Details</label>
//     <span className="text-red-500">*</span>
//     <input
//       type="text"
//       value={value}
//       onChange={handleInputChange(setImporterDetails, "importerDetails")}
//       placeholder="Enter Importer Details..."
//       className={`mt-2 block w-full text-xs px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.importerDetails ? "border-red-500" : "border-gray-300"}`}
//     />
//     {errors.importerDetails && <p className="text-red-500 text-sm">{errors.importerDetails}</p>}
//   </div>
// );

// const DimensionField = ({ isOpen, setIsOpen, dimensions, handleDimensionChange, handleInputChange }) => (
//   <div className="relative">
//     <label className="text-xs font-semibold text-gray-700">Dimension</label>
//     <span className="text-red-500">*</span>
//     <div
//       className="cursor-pointer bg-gray-50 border mt-2 border-gray-300 rounded-md p-2 flex items-center justify-between text-xs"
//       onClick={() => setIsOpen(!isOpen)}
//     >
//       <span className="text-gray-700 font-medium">Package Dimensions</span>
//       <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
//     </div>
//     {isOpen && (
//       <div className="absolute top-15 z-20 left-0 mt-2 border border-gray-300 rounded-lg p-3 bg-white shadow-sm transition-all">
//         {['Length', 'Width', 'Height'].map((dim) => (
//           <div key={dim} className="flex items-center justify-between mb-2">
//             <label className="w-1/4 text-xs font-medium text-gray-600">{dim}</label>
//             <div className="flex items-center w-3/4">
//               <input
//                 type="number"
//                 name={dim.toLowerCase()}
//                 value={dimensions[dim.toLowerCase()]}
//                 onChange={handleDimensionChange}
//                 placeholder={`${dim} (cm)`}
//                 className="border border-gray-300 text-xs px-2 py-1 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
//               />
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );


// const SelectField = ({ label, value, onChange, options }) => (
//   <div>
//     <label className="text-sm font-medium text-gray-700">{label}</label>
//     <span className="text-red-500">*</span>
//     <div className="border border-gray-300 rounded-[3px] mt-2">
//       <select
//         className="ml-2 text-xs border-none text-slate-700 rounded-[3px] h-[35px] px-2"
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//       >
//         {options.map((option, index) => (
//           <option key={index} value={option}>{option}</option>
//         ))}
//       </select>
//     </div>
//   </div>
// );

// const SearchTagsField = ({ value, onChange }) => (
//   <div className="relative">
//     <div className="flex items-center justify-between">
//       <label className="text-sm font-medium text-gray-700">Search Tags <span className="text-red-500">*</span></label>
      
//       <div className="relative group">
//         <FaQuestionCircle className="cursor-pointer text-gray-600" />
//         <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-gray-900 text-white text-xs rounded-md px-3 py-1 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
//           Enter keywords separated by commas. It helps to improve product search.
//           <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45"></div>
//         </div>
//       </div>
//     </div>
//     <input
//       type="text"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       placeholder="Enter your product tags..."
//       className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//     />
//   </div>
// );

// export default GeneralInfo;















import { FaQuestionCircle } from "react-icons/fa";

const GeneralInfo = ({
  
  maxPurchaseLimit,
  setMaxPurchaseLimit,
  dimensions,
  handleDimensionChange,
  isDimensionOpen,
  setIsDimensionOpen,
  warrantyPeriod,
  setWarrantyPeriod,
  description,
  setDescription,
  brand,
  setBrand,
  tags,
  setTags,
  importerDetails,
  setImporterDetails, 
  handleInputChange,
  errors
}) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:gap-4 gap-2 md:p-6 p-2 bg-white rounded-lg shadow-lg">
      
      {/* <InputField  label="Max Purchase Limit" name='maxPurchaseLimit' value={maxPurchaseLimit} onChange={setMaxPurchaseLimit} placeholder="Ex. 3" type="number" max={5} min={1} /> */}
      {/* <MaxPurchaseLimitField value={maxPurchaseLimit} setMaxPurchaseLimit={setMaxPurchaseLimit}  handleInputChange={handleInputChange} errors={errors}  /> */}

      <InputField  
        label="Max Purchase Limit" 
        name="maxPurchaseLimit" 
        value={maxPurchaseLimit} 
        onChange={(e) => handleInputChange(setMaxPurchaseLimit, "maxPurchaseLimit")(e)} // ✅ Correct call
        placeholder="Ex. 3" 
        type="number" 
        // max={5} 
        // min={1} 
        errors={errors} 
      />

      <DimensionField
        isOpen={isDimensionOpen}
        setIsOpen={setIsDimensionOpen}
        dimensions={dimensions}
        handleDimensionChange={handleDimensionChange}
        
      />
      
      <SelectField
        label="Warranty Period"
        value={warrantyPeriod}
        onChange={setWarrantyPeriod}
        options={["No warranty", "3 Month", "6 Month", "1 year"]}
      />
      
      <InputField label="Description" name='description' value={description} onChange={(e) => handleInputChange(setDescription, 'description')(e)} placeholder="Enter description..." />
      <InputField label="Brand" name='brand' value={brand} onChange={(e) => handleInputChange(setBrand, "brand")(e)} placeholder="Enter Brand..." />
      <SearchTagsField value={tags} onChange={setTags} />
      {/* New Importer Details Field */}
      <ImporterDetailsField value={importerDetails} setImporterDetails={setImporterDetails}  handleInputChange={handleInputChange} errors={errors} />
    </div>
  );
};



const InputField = ({ label, name, value, onChange, placeholder, type = "text", errors, ...rest }) => {
  return (
    <div>
      <label className="text-sm font-medium text-gray-700">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`mt-2 block w-full text-xs px-3 h-[35px] border rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          errors?.[name] ? "border-red-500" : "border-gray-300"
        }`}
        {...rest}
      />
      {errors?.[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );
};







// Importer Details Field Component
const ImporterDetailsField = ({ value, setImporterDetails, handleInputChange, errors }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">Importer Details</label>
    <span className="text-red-500">*</span>
    <input
      type="text"
      value={value}
      onChange={handleInputChange(setImporterDetails, "importerDetails")}
      placeholder="Enter Importer Details..."
      className={`mt-2 block w-full text-xs px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${errors.importerDetails ? "border-red-500" : "border-gray-300"}`}
    />
    {errors.importerDetails && <p className="text-red-500 text-sm">{errors.importerDetails}</p>}
  </div>
);

const DimensionField = ({ isOpen, setIsOpen, dimensions, handleDimensionChange, handleInputChange }) => (
  <div className="relative">
    <label className="text-xs font-semibold text-gray-700">Dimension</label>
    <span className="text-red-500">*</span>
    <div
      className="cursor-pointer bg-gray-50 border mt-2 border-gray-300 rounded-md p-2 flex items-center justify-between text-xs"
      onClick={() => setIsOpen(!isOpen)}
    >
      <span className="text-gray-700 font-medium">Package Dimensions</span>
      <span className="text-gray-500">{isOpen ? "▲" : "▼"}</span>
    </div>
    {isOpen && (
      <div className="absolute top-15 z-20 left-0 mt-2 border border-gray-300 rounded-lg p-3 bg-white shadow-sm transition-all">
        {['Length', 'Width', 'Height'].map((dim) => (
          <div key={dim} className="flex items-center justify-between mb-2">
            <label className="w-1/4 text-xs font-medium text-gray-600">{dim}</label>
            <div className="flex items-center w-3/4">
              <input
                type="number"
                name={dim.toLowerCase()}
                value={dimensions[dim.toLowerCase()]}
                onChange={handleDimensionChange}
                placeholder={`${dim} (cm)`}
                className="border border-gray-300 text-xs px-2 py-1 w-full rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);


const SelectField = ({ label, value, onChange, options }) => (
  <div>
    <label className="text-sm font-medium text-gray-700">{label}</label>
    <span className="text-red-500">*</span>
    <div className="border border-gray-300 rounded-[3px] mt-2">
      <select
        className="ml-2 text-xs border-none text-slate-700 rounded-[3px] h-[35px] px-2"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>{option}</option>
        ))}
      </select>
    </div>
  </div>
);

const SearchTagsField = ({ value, onChange }) => (
  <div className="relative">
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-gray-700">Search Tags <span className="text-red-500">*</span></label>
      
      <div className="relative group">
        <FaQuestionCircle className="cursor-pointer text-gray-600" />
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 bg-gray-900 text-white text-xs rounded-md px-3 py-1 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
          Enter keywords separated by commas. It helps to improve product search.
          <div className="absolute left-1/2 transform -translate-x-1/2 top-full w-2 h-2 bg-gray-900 rotate-45"></div>
        </div>
      </div>
    </div>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Enter your product tags..."
      className="mt-2 block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);

export default GeneralInfo;