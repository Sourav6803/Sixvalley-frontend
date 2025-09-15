// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllOrdersOfShop } from "../../../redux/actions/order";
// import Loader from "../../../pages/Loader";
// import productImage from "../icon/package-box.png";
// import { GoAlert } from "react-icons/go";
// import { FcUnlock } from "react-icons/fc";
// import PendingOrderTable from "./PendingOrderTable";
// import ReadyToShipOrderTable from "./ReadytoShipOrderTable";
// import ReadyForPickupOrderTable from "./ReadyForPickupOrderTable";

// const Order = ({open}) => {
//   const { orders, isLoading } = useSelector((state) => state.order);
//   const { seller } = useSelector((state) => state.seller);

//   const [currentTable, setCurrentTable] = useState("pending");

//   // const [isDisabled, setIsDisabled] = useState(true);
//   const [activeTab, setActiveTab] = useState("Pending");

//   const pendingOrder = orders?.filter((order) => order?.status === "Pending");
//   const confirmedOrder = orders?.filter((order) => order?.status === "Confirmed");
//   const readyForPickup = orders?.filter((order)=> order?.status === "processing")
//   const shippedOrder = orders?.filter((order) => order?.status === "Shipped");
//   const cancledOrder = orders?.filter((order) => order?.status === "Cancled");
  

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfShop(seller?._id));
//   }, [dispatch, seller?._id]);

//   const tabs = [
//     { id: 1, name: "Pending", count: pendingOrder?.length },
//     { id: 2, name: "Confirmed", count: confirmedOrder?.length },
//     { id: 3, name: "ReadyForPickup", count: readyForPickup?.length },
//     { id: 4, name: "Shipped", count: shippedOrder?.length },
//     { id: 5, name: "Cancelled", count: cancledOrder?.length },
//   ];

//   const handleTabClick = (tab) => {
//     setActiveTab(tab);
//     setCurrentTable(tab.toLowerCase());
//   };

//   return (
//     <>
//       {isLoading ? (
//         <div className="flex items-center justify-center h-screen">
//           <Loader />
//         </div>
//       ) : (
//         <div className={`w-full ${open ? "md:ml-72" : "md:ml-20"} mt-20 h-[calc(100vh-80px)] p-0 md:p-2 bg-gray-200 overflow-y-auto`}>
//           <div className="flex items-center gap-2">
//             <img src={productImage} alt="layout" className="h-8" />
//             <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">
//               Order List
//             </h3>
//           </div>

//           <div className="w-full mt-2 bg-white p-1 rounded-md  gap-2 hover:shadow-md">
//             <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded-md shadow-md">
//               <div className="flex flex-wrap gap-2 items-center">
//                 {/* Icon, Heading, and Button in One Row */}
//                 <div className="flex items-center flex-1">
//                   <GoAlert className="h-6 w-6 text-yellow-500 mr-3 shrink-0" />
//                   <h2 className="text-sm sm:text-[14px] font-semibold text-yellow-900 flex-1">
//                     Alert: Mandatory Barcoded Packaging Policy Update!
//                   </h2>
//                   <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-xs px-3 py-1 sm:px-4 sm:py-2 rounded-md shrink-0">
//                     View Policy
//                   </button>
//                 </div>
//                 {/* Paragraph on a New Row */}
//                 <p className="text-xs sm:text-[12px] text-yellow-800  w-full">
//                   Starting February 9th, 2024, sellers must use transparent
//                   barcoded packaging for their products, as per the policy.
//                 </p>
//               </div>
//             </div>

//             <div className="mt-4 flex flex-wrap items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm gap-4">
//               <div className="flex items-start flex-1">
//                 <FcUnlock className="h-6 w-6 text-green-500 mr-3 shrink-0" />
//                 <p className="text-[12px] sm:text-[12px] text-gray-700">
//                   Unlock added protection for shipments with barcoded packets
//                   and enjoy up to{" "}
//                   <span className="text-green-600 font-semibold">
//                     100% approval
//                   </span>{" "}
//                   on valid RTO claims subject to internal policy!
//                 </p>
//               </div>
//               <div className="flex md:flex-wrap  gap-3">
//                 <button className="bg-blue-500 hover:bg-blue-600 text-white text-[12px] sm:text-[14px] px-3 py-2 rounded-md">
//                   Buy Branded Packets
//                 </button>
//                 <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[12px] sm:text-[14px] px-3 py-2 rounded-md">
//                   Scan Branded Packets
//                 </button>
//               </div>
//             </div>

//             <div className="mt-3">
//               {/* Tabs Section */}
//               <div className="flex flex-wrap border-b border-gray-200">
//                 {tabs?.map((tab) => (
//                   <button
//                     key={tab.name}
//                     className={`px-1 py-2 text-[12px] font-semibold focus:outline-none ${
//                       activeTab === tab?.name
//                         ? "border-b-2 border-blue-500 text-blue-500"
//                         : "text-gray-600"
//                     }`}
//                     onClick={() => handleTabClick(tab.name)}
//                   >
//                     {tab.name} ({tab.count})
//                   </button>
//                 ))}
//               </div>

              

//               <div className="mt-4">
//                 {currentTable === "pending" && (
//                   <PendingOrderTable
//                     pendingOrder={pendingOrder}
//                     isLoading={isLoading}
//                   />
//                 )}

//                 {currentTable === "confirmed" && (
//                   <ReadyToShipOrderTable 
//                     confirmedOrder={confirmedOrder} 
//                     isLoading={isLoading} 
//                   />
//                 )}

//                 {currentTable === "ReadyForPickup" && (
//                   <ReadyForPickupOrderTable 
//                     readyForPickupOrder={readyForPickup} 
//                     isLoading={isLoading} 
//                   />
//                 )}

//                 {/* {currentTable === 'confirmed' && <ConfirmedOrder />}
//  {currentTable === 'shipped' && <ShippedOrder />}
//  {currentTable === 'canceled' && <CanceledOrder />}  */}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Order;

//  <div className="mt-4">
// {currentTable === "pending" && <PendingOrderTable />}
//  {currentTable === 'confirmed' && <ConfirmedOrder />}
// {currentTable === 'shipped' && <ShippedOrder />}
// {currentTable === 'canceled' && <CanceledOrder />}
// </div>



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../../redux/actions/order";
import Loader from "../../../pages/Loader";
import productImage from "../icon/package-box.png";
import { GoAlert } from "react-icons/go";
import { FcUnlock } from "react-icons/fc";
import PendingOrderTable from "./PendingOrderTable";
import ReadyToShipOrderTable from "./ReadytoShipOrderTable";
import ReadyForPickupOrderTable from "./ReadyForPickupOrderTable";

const Order = ({open}) => {
  const { orders, isLoading } = useSelector((state) => state.order);
  const { seller } = useSelector((state) => state.seller);

  const [currentTable, setCurrentTable] = useState("pending");

  const [activeTab, setActiveTab] = useState("Pending");

  const pendingOrder = orders?.filter((order) => order?.status === "Pending");
  const confirmedOrder = orders?.filter((order) => order?.status === "Confirmed");
  const readyForPickup = orders?.filter((order)=> order?.status === "processing")
  const shippedOrder = orders?.filter((order) => order?.status === "Shipped");
  const cancledOrder = orders?.filter((order) => order?.status === "Cancled");
  

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller?._id));
  }, [dispatch, seller?._id]);

  const tabs = [
    { id: 1, name: "Pending", count: pendingOrder?.length },
    { id: 2, name: "Confirmed", count: confirmedOrder?.length },
    { id: 3, name: "ReadyForPickup", count: readyForPickup?.length },
    { id: 4, name: "Shipped", count: shippedOrder?.length },
    { id: 5, name: "Cancelled", count: cancledOrder?.length },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // Convert tab name to lowercase for consistent comparison
    setCurrentTable(tab.toLowerCase());
  };

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className={`w-full ${open ? "md:ml-72" : "md:ml-20"} mt-20 h-[calc(100vh-80px)] p-0 md:p-2 bg-gray-200 overflow-y-auto`}>
          <div className="flex items-center gap-2">
            <img src={productImage} alt="layout" className="h-8" />
            <h3 className="text-[20px] text-slate-600 font-Poppins font-semibold">
              Order List
            </h3>
          </div>

          <div className="w-full mt-2 bg-white p-1 rounded-md  gap-2 hover:shadow-md">
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded-md shadow-md">
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex items-center flex-1">
                  <GoAlert className="h-6 w-6 text-yellow-500 mr-3 shrink-0" />
                  <h2 className="text-sm sm:text-[14px] font-semibold text-yellow-900 flex-1">
                    Alert: Mandatory Barcoded Packaging Policy Update!
                  </h2>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white text-xs sm:text-xs px-3 py-1 sm:px-4 sm:py-2 rounded-md shrink-0">
                    View Policy
                  </button>
                </div>
                <p className="text-xs sm:text-[12px] text-yellow-800  w-full">
                  Starting February 9th, 2024, sellers must use transparent
                  barcoded packaging for their products, as per the policy.
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between bg-gray-100 p-2 rounded-md shadow-sm gap-4">
              <div className="flex items-start flex-1">
                <FcUnlock className="h-6 w-6 text-green-500 mr-3 shrink-0" />
                <p className="text-[12px] sm:text-[12px] text-gray-700">
                  Unlock added protection for shipments with barcoded packets
                  and enjoy up to{" "}
                  <span className="text-green-600 font-semibold">
                    100% approval
                  </span>{" "}
                  on valid RTO claims subject to internal policy!
                </p>
              </div>
              <div className="flex md:flex-wrap  gap-3">
                <button className="bg-blue-500 hover:bg-blue-600 text-white text-[12px] sm:text-[14px] px-3 py-2 rounded-md">
                  Buy Branded Packets
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-[12px] sm:text-[14px] px-3 py-2 rounded-md">
                  Scan Branded Packets
                </button>
              </div>
            </div>

            <div className="mt-3">
              {/* Tabs Section */}
              <div className="flex flex-wrap border-b border-gray-200">
                {tabs?.map((tab) => (
                  <button
                    key={tab.name}
                    className={`px-1 py-2 text-[12px] font-semibold focus:outline-none ${
                      activeTab === tab?.name
                        ? "border-b-2 border-blue-500 text-blue-500"
                        : "text-gray-600"
                    }`}
                    onClick={() => handleTabClick(tab.name)}
                  >
                    {tab.name} ({tab.count})
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {currentTable === "pending" && (
                  <PendingOrderTable
                    pendingOrder={pendingOrder}
                    isLoading={isLoading}
                  />
                )}

                {currentTable === "confirmed" && (
                  <ReadyToShipOrderTable 
                    confirmedOrder={confirmedOrder} 
                    isLoading={isLoading} 
                  />
                )}

                {/* FIXED: Use lowercase for comparison */}
                {currentTable === "readyforpickup" && (
                  <ReadyForPickupOrderTable 
                    readyForPickupOrder={readyForPickup} 
                    isLoading={isLoading} 
                  />
                )}

                {/* Add other tables as needed */}
                {currentTable === "shipped" && (
                  <div>Shipped Order Table Component</div>
                )}
                
                {currentTable === "cancelled" && (
                  <div>Cancelled Order Table Component</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Order;