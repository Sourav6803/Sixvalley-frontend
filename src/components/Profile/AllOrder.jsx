import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersOfUser } from '../../redux/actions/order'
import { useNavigate } from 'react-router-dom'

const AllOrder = () => {
  const { orders } = useSelector(state => state.order)
  const { user } = useSelector(state => state.user)
  const navigate = useNavigate()

  // console.log(orders)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id))
  }, [dispatch, user?._id])


  return (
    <div className="p-2 w-full">
      {/* Search Bar */}
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search your order here"
          className="flex-1 border p-2 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
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

      {/* Filters */}
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">Filters</p>
        <button className="text-blue-600 hover:underline">Filters</button>
      </div>

      {/* Order List */}
      <div className="space-y-4">
        {orders && orders?.map((order) => (
          <div
            key={order?._id}
            className="bg-white p-4 shadow-md rounded-md flex items-start space-x-4"
            onClick={()=>navigate(`/user/order/${order?._id}`)}
          >
         
            {
              order?.cart.map((item) => (
                <div key={item?._id} className='flex items-center justify-between gap-3'>
               
                  <img
                    src={item?.images[0]?.url}
                    alt={"jj"}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">{order?.status}</p>
                    <p className="font-semibold text-gray-700">{item?.name ? item.name : item?.data.name}</p>
                    
                  </div>

                </div>
              ))
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllOrder