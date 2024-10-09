


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrdersOfUser } from '../../redux/actions/order';
import { useNavigate } from 'react-router-dom';
import Loader from "../../pages/Loader"

const AllOrder = () => {
  const { orders, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user?._id]);

  console.log(orders)

  function formatMongoDate(date) {
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
  }

  return (
    <div className="p-4 w-full">
      {/* Search Bar */}
      {
        orders?.length &&
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Search your order here"
            className="flex-1 border p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="ml-4 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z"
              />
            </svg>
          </button>
        </div>
      }

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-full">
          <Loader />
        </div>
      ) : (
        <div>
          {/* Order List */}
          <div className="space-y-4">
            {orders && orders.length > 0 ? (
              // Sort orders by createdAt in descending order
              [...orders]
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((order) => (
                  <div
                    key={order?._id}
                    className="bg-white p-4 shadow-md rounded-md space-y-4"
                    onClick={() => navigate(`/user/order/${order?._id}`)}
                  >
                  
                    {order?.cart.map((item) => (
                      <div key={item?._id} className="flex items-center justify-between gap-4">
                        <img
                          src={item?.images[0]?.url}
                          alt={item?.name}
                          className="w-16 h-18 object-cover rounded-md"
                        />
                        <div className="flex-1">
                          <p
                            className={`text-sm ${order?.status === 'Delivered'
                                ? 'bg-green-100 text-green-700 px-2 py-1 rounded-md'
                                : 'text-gray-500'
                              }`}
                          >
                            {order?.status}{' '}
                            {order?.status === 'Delivered' &&
                              formatMongoDate(new Date(order?.deliveredAt))}
                          </p>
                          <p className="font-medium text-gray-700">
                            {item?.name?.length > 80 ? item?.name.slice(0, 80) + '...' : item?.name}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-600">
                <img
                  src="/assets/no-orders.png"
                  alt="No orders"
                  className="w-64 h-64 object-cover"
                />
                <p className="mt-4 text-lg">You have no orders yet!</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllOrder;
