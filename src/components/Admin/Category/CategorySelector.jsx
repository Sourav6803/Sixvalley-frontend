// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import MultilevelDropdown from "./NestedCategory";

// const CategorySelector = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [suggestions, setSuggestions] = useState([]);
//   const [allCategories, setAllCategories] = useState([]);
//   const [path, setPath] = useState(null);

// // Fetch all categories when the component mounts
//   useEffect(() => {
//     const fetchAllCategories = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8000/api/v3/category/all"
//         ); // Adjust endpoint as necessary
//         setAllCategories(response.data.categories);
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     fetchAllCategories();
//   }, []);

//   useEffect(() => {
//     if (searchTerm.length > 1) {
//       const fetchSuggestions = async () => {
//         try {
//           const response = await axios.get(
//             "http://localhost:8000/api/v3/category/search",
//             {
//               params: { query: searchTerm },
//             }
//           );
//           setSuggestions(response.data);
//         } catch (error) {
//           console.error("Error fetching suggestions:", error);
//         }
//       };

//       fetchSuggestions();
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchTerm]);

//   const handleSelect = () => {
//     setSearchTerm("");
//     setSuggestions([]);
//   };

//   function convertToBreadcrumbArray(path) {
//     if (!path || typeof path !== "string") {
//       return [];
//     }
//     return path.split(">").map((item) => item.trim());
//   }

//   return (
//     <div className="w-full mt-10">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Search categories..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-[80%] px-4 py-1 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//         />

//         {suggestions.length > 0 && (
//           <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
//             {suggestions.map((suggestion) => (
//               <li
//                 key={suggestion.id}
//                 onClick={() => {
//                   handleSelect(suggestion); // Call handleSelect
//                   setPath(convertToBreadcrumbArray(suggestion?.path));
                  
//                 }}
//                 className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-indigo-50"
//               >
//                 <span className="text-[14px] text-slate-700 font-medium">{suggestion?.message}</span>
//                 <br />
//                 <span className="text-[12px] text-slate-600">{suggestion.path}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <MultilevelDropdown categories={allCategories} path={path} />
//     </div>
//   );
// };

// export default CategorySelector;









import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import MultilevelDropdown from "./NestedCategory";
import { serverTwo } from "../../../server";

const CategorySelector = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [path, setPath] = useState(null);

  // Fetch all categories when the component mounts
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          `${serverTwo}/category/all`
        ); // Adjust endpoint as necessary
        setAllCategories(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (searchTerm.length > 1) {
      const fetchSuggestions = async () => {
        try {
          const response = await axios.get(`${serverTwo}/category/search`, { params: { query: searchTerm }});
          setSuggestions(response.data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchTerm]);

  const handleSelect = () => {
    setSearchTerm("");
    setSuggestions([]);
  };

  function convertToBreadcrumbArray(path) {
    if (!path || typeof path !== "string") {
      return [];
    }
    return path.split(">").map((item) => item.trim());
  }

  return (
    <div className="w-full mt-10 px-4">
      <div className="relative max-w-lg mx-auto">
        <div className="relative flex items-center">
          <FiSearch className="absolute left-3 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-10 py-2 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
          {searchTerm && (
            <MdClose
              className="absolute right-3 text-gray-400 text-lg cursor-pointer hover:text-gray-600"
              onClick={() => setSearchTerm("")}
            />
          )}
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-10">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => {
                  handleSelect(suggestion);
                  setPath(convertToBreadcrumbArray(suggestion?.path));
                }}
                className="px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-indigo-50"
              >
                <span className="text-[14px] text-slate-700 font-medium">
                  {suggestion?.message}
                </span>
                <br />
                <span className="text-[12px] text-slate-600">
                  {suggestion.path}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="mt-6">
        <MultilevelDropdown categories={allCategories} path={path} />
      </div>
    </div>
  );
};

export default CategorySelector;


