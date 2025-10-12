// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getAllOrdersOfUser } from '../../redux/actions/order';
// import { useNavigate } from 'react-router-dom';
// import Loader from "../../pages/Loader"

// const AllOrder = () => {
//   const { orders, loading } = useSelector((state) => state.order);
//   const { user } = useSelector((state) => state.user);
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');

//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user?._id));
//   }, [dispatch, user?._id]);

//   console.log(orders)

//   function formatMongoDate(date) {
//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
//     const day = date.getDate();
//     const month = months[date.getMonth()];
//     const year = date.getFullYear();
//     const daySuffix = (day) => {
//       if (day > 3 && day < 21) return 'th';
//       switch (day % 10) {
//         case 1: return 'st';
//         case 2: return 'nd';
//         case 3: return 'rd';
//         default: return 'th';
//       }
//     };
//     return `${day}${daySuffix(day)} ${month}, ${year}`;
//   }

//   return (
//     <div className="p-4 w-full">
//       {/* Search Bar */}
//       {
//         orders?.length &&
//         <div className="flex items-center mb-4">
//           <input
//             type="text"
//             placeholder="Search your order here"
//             className="flex-1 border p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//           <button className="ml-4 text-gray-600">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//               className="w-6 h-6"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
//               />
//             </svg>
//           </button>
//         </div>
//       }

//       {/* Loader */}
//       {loading ? (
//         <div className="flex justify-center items-center h-full">
//           <Loader />
//         </div>
//       ) : (
//         <div>
//           {/* Order List */}
//           <div className="space-y-4">
//             {orders && orders.length > 0 ? (
//               // Sort orders by createdAt in descending order
//               [...orders]
//                 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//                 .map((order) => (
//                   <div
//                     key={order?._id}
//                     className="bg-white p-4 shadow-md rounded-md space-y-4"
//                     onClick={() => navigate(`/user/order/${order?._id}`)}
//                   >
                  
//                     {order?.cart.map((item) => (
//                       <div key={item?._id} className="flex items-center justify-between gap-4">
//                         <img
//                           src={item?.images[0]?.url}
//                           alt={item?.name}
//                           className="w-16 h-18 object-cover rounded-md"
//                         />
//                         <div className="flex-1">
//                           <p
//                             className={`text-sm ${order?.status === 'Delivered'
//                                 ? 'bg-green-100 text-green-700 px-2 py-1 rounded-md'
//                                 : 'text-gray-500'
//                               }`}
//                           >
//                             {order?.status}{' '}
//                             {order?.status === 'Delivered' &&
//                               formatMongoDate(new Date(order?.deliveredAt))}
//                           </p>
//                           <p className="font-medium text-gray-700">
//                             {item?.name?.length > 80 ? item?.name.slice(0, 80) + '...' : item?.name}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ))
//             ) : (
//               <div className="flex flex-col items-center justify-center text-gray-600">
//                 <img
//                   src="/assets/no-orders.png"
//                   alt="No orders"
//                   className="w-64 h-64 object-cover"
//                 />
//                 <p className="mt-4 text-lg">You have no orders yet!</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllOrder;


import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '../../redux/actions/order';
import { useNavigate } from 'react-router-dom';
import Loader from "../../pages/Loader";

const AllOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user?._id]);

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    if (!orders) return [];
    
    let result = [...orders];
    
    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      result = result.filter(order => 
        order.cart.some(item => 
          item.name.toLowerCase().includes(searchLower)
        ) || 
        order._id.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter(order => order.status === statusFilter);
    }
    
    // Apply sorting
    switch(sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'price-high':
        result.sort((a, b) => b.totalPrice - a.totalPrice);
        break;
      case 'price-low':
        result.sort((a, b) => a.totalPrice - b.totalPrice);
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    
    return result;
  }, [orders, search, statusFilter, sortBy]);

  const formatMongoDate = (date) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const daySuffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    return `${day}${daySuffix(day)} ${month}, ${year}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Delivered':
        return 'bg-green-100 text-green-700';
      case 'Processing':
        return 'bg-blue-100 text-blue-700';
      case 'Shipped':
        return 'bg-purple-100 text-purple-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      case 'Refunded':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTotalItems = (cart) => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  return (
    <div className="p-4 w-full max-w-6xl mx-auto">
      
      
      {/* Filters and Search */}
      <div className="bg-white p-2 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by product name or order ID"
              className="pl-10 w-full border p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <select 
              className="border p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Refunded">Refunded</option>
            </select>
            
            <select 
              className="border p-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price-high">Price: High to Low</option>
              <option value="price-low">Price: Low to High</option>
            </select>
          </div>
        </div>
      </div>

      {/* Order Summary Stats */}
      {orders && orders.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
            <div className="text-xs text-gray-600">Total Orders</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-green-600">
              {orders.filter(o => o.status === 'Delivered').length}
            </div>
            <div className="text-xs text-gray-600">Delivered</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-blue-600">
              {orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length}
            </div>
            <div className="text-xs text-gray-600">In Progress</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-red-600">
              {orders.filter(o => o.status === 'Cancelled').length}
            </div>
            <div className="text-xs text-gray-600">Cancelled</div>
          </div>
          <div className="bg-white p-3 rounded-lg shadow-sm text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {orders.reduce((total, order) => total + getTotalItems(order.cart), 0)}
            </div>
            <div className="text-xs text-gray-600">Total Items</div>
          </div>
        </div>
      )}

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <div>
          {/* Order List */}
          <div className="space-y-4">
            {filteredOrders && filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div
                  key={order?._id}
                  className="bg-white p-2 shadow-md rounded-lg hover:shadow-lg transition-shadow cursor-pointer border border-gray-100"
                  onClick={() => navigate(`/user/order/${order?._id}`)}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Order Placed</p>
                      <p className="font-medium">{formatMongoDate(new Date(order?.createdAt))}</p>
                    </div>
                    <div className="mt-2 md:mt-0">
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-bold">₹{order?.totalPrice?.toFixed(2)}</p>
                    </div>
                    <div className="mt-2 md:mt-0 text-right">
                      <p className="text-sm text-gray-500">Order # {order?._id.slice(-8)}</p>
                      <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order?.status)}`}>
                        {order?.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex overflow-x-auto pb-2 hide-scrollbar">
                      {order?.cart.map((item) => (
                        <div key={item?._id} className="flex-shrink-0 w-32 mr-4">
                          <img
                            src={item?.images[0]?.url}
                            alt={item?.name}
                            className="w-full h-24 object-cover rounded-md"
                          />
                          <p className="text-xs mt-1 text-gray-700 truncate">
                            {item?.name}
                          </p>
                          <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        </div>
                      ))}
                    </div>
                    
                    {order?.status === 'Delivered' && order?.deliveredAt && (
                      <div className="mt-3 text-sm text-gray-600">
                        Delivered on {formatMongoDate(new Date(order?.deliveredAt))}
                      </div>
                    )}
                    
                    <div className="mt-3 flex justify-end">
                      <button 
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/user/order/${order?._id}`);
                        }}
                      >
                        View Order Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-600 bg-white rounded-lg shadow-sm">
                <img
                  src="/assets/no-orders.png"
                  alt="No orders"
                  className="w-56 h-56 object-cover mb-4"
                />
                <p className="text-xl font-medium mb-2">No orders found</p>
                <p className="text-gray-500 mb-6">
                  {search || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria' 
                    : 'You have no orders yet!'}
                </p>
                {(search || statusFilter !== 'all') ? (
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => {
                      setSearch('');
                      setStatusFilter('all');
                    }}
                  >
                    Clear Filters
                  </button>
                ) : (
                  <button 
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    onClick={() => navigate('/products')}
                  >
                    Start Shopping
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
