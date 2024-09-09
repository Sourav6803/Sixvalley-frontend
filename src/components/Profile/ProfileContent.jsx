import React, { useEffect, useState } from 'react';
import { server } from '../../server';
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineArrowRight, AiOutlineCamera, AiOutlineDelete } from 'react-icons/ai';
import { MdTrackChanges } from 'react-icons/md'
import styles from '../../styles/styles';
import { Link } from 'react-router-dom'
import { DataGrid } from "@material-ui/data-grid";
// import { Button } from "@material-ui/core";
import Button from '@mui/material/Button'
import { deleteUserAddress, updatUserAddress, updateUserInformation } from '../../redux/actions/user';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Country, State } from "country-state-city";
import { RxCross1 } from "react-icons/rx"
import { getAllOrdersOfUser } from '../../redux/actions/order';
import Loader from '../../pages/Loader';


const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user?.name)
  const [email, setEmail] = useState(user && user?.email)
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber)

  const [avatar, setAvatar] = useState()
  const dispatch = useDispatch()

  const [loading, setLoading] = useState(false); // To manage loading state
  const [imageLoading, setImageLoading] = useState(false); // For image upload

  // Synchronize form data when `user` state changes
  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhoneNumber(user.phoneNumber);
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessages" });
    }
  }, [error, successMessage, user, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when profile data is being updated
    dispatch(updateUserInformation(name, email, phoneNumber,)).finally(() => {
      toast.success("Profile updated successfully")
      setLoading(false); // Stop loading after the update completes
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const formData = new FormData();
    formData.append("avatar", file);

    setImageLoading(true); // Start loading for image upload
    await axios.put(`${server}/user/update-avatar`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    }).then((response) => {
      window.location.reload();
    }).catch((error) => {
      toast.error(error);
    }).finally(() => {
      setImageLoading(false); // Stop loading after image upload completes
    });
  };
  return (
    <div className='w-full '>


      {/* Profile section */}

      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            {
              imageLoading ? (
                <div className="relative ">
                  <Loader />
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={`${user?.avatar?.url}`}
                    className="w-[150px] h-[150px] rounded-full object-cover border-[3px] border-[#3ad132]"
                    alt=""
                  />

                  <div className="w-[30px] h-[30px] bg-[#E3E9EE] rounded-full flex items-center justify-center cursor-pointer absolute bottom-[5px] right-[5px]">
                    <input
                      type="file"
                      id="image"
                      className="hidden"
                      onChange={handleImage}
                    />
                    <label htmlFor="image">
                      <AiOutlineCamera />
                    </label>
                  </div>

                </div>
              )
            }

          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Full Name</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Email Address</label>
                  <input
                    type="text"
                    className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="w-full 800px:flex block pb-3">
                <div className=" w-[100%] 800px:w-[50%]">
                  <label className="block pb-2">Phone Number</label>
                  <input
                    type="number"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={loading}
                  />
                </div>


              </div>

              <button
                className={`w-[250px] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer hover:bg-[#3a24db] hover:text-white`}
                type="submit"
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </button>
            </form>
          </div>
        </>
      )}


      {/* order */}

      {
        active === 2 && (
          <div>
            <AllOrders />
          </div>
        )
      }

      {/* Refund */}

      {
        active === 3 && (
          <div>
            <AllRefundOrders />
          </div>
        )
      }

      {/* Track order */}

      {
        active === 5 && (
          <div>
            <TrackOrder />
          </div>
        )
      }

      {/* Change password */}

      {
        active === 6 && (
          <div>
            <ChangePassword />
          </div>
        )
      }

      {/* Address */}

      {
        active === 7 && (
          <div>
            <Address />
          </div>
        )
      }

    </div>
  )
}

export const AllOrders = () => {

  const { orders } = useSelector(state => state.order)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id))
  }, [dispatch, user?._id])



  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQty: item?.cart?.length,
        total: "₹" + item?.totalPrice,
        status: item?.status,
      });
    })

  return (
    <div className='pl-8 pt-1'>
      <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
    </div>
  )
}

const AllRefundOrders = () => {
  const { orders } = useSelector(state => state.order)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [])

  const eligableOrder = orders && orders.filter((item) => item.status === "Refund Success")



  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/order/${params.id}`}>
              <Button>
                <AiOutlineArrowRight size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  eligableOrder &&
    eligableOrder.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQty: item?.cart?.length,
        total: "₹" + item?.totalPrice,
        status: item?.status,
      });
    })

  return (
    <div className='pl-8 pt-1'>
      <DataGrid rows={row} columns={columns} pageSize={10} autoHeight disableSelectionOnClick />
    </div>
  )
}


const TrackOrder = () => {
  const { orders } = useSelector(state => state.order)
  const { user } = useSelector(state => state.user)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id))
  }, [dispatch, user?._id])


  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },

    {
      field: " ",
      flex: 1,
      minWidth: 150,
      headerName: "",
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/user/track/order/${params.id}`}>
              <Button>
                <MdTrackChanges size={20} />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  const row = [];

  orders &&
    orders.forEach((item) => {
      row.push({
        id: item?._id,
        itemsQty: item?.cart?.length,
        total: "₹" + item?.totalPrice,
        status: item?.status,
      });
    })


  return (
    <div>
      <DataGrid rows={row} columns={columns} pageSize={10} disableSelectionOnClick autoHeight />
    </div>
  )

}


export const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/update-user-password`,
        { oldPassword, newPassword, confirmPassword },
        { withCredentials: true }
      )
      .then((res) => {
        toast.success(res?.data?.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <div className="w-full px-5">
      <h1 className="block text-[25px] text-center font-[600] text-[#000000ba] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          aria-required
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[50%] mt-5">
            <label className="block pb-2">Enter your old password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your new password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className=" w-[100%] 800px:w-[50%] mt-2">
            <label className="block pb-2">Enter your confirm password</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-[#3a24db] text-center text-[#3a24db] rounded-[3px] mt-8 cursor-pointer`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export const Address = () => {
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState();
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const addressTypeData = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Office",
    },
  ];

  const validateZipCode = (zip) => {
    return /^\d{6}$/.test(zip); // Exactly 6 digits
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (addressType === "" || country === "" || city === "") {
      toast.error("Please fill all the fields!*");
    } else {
      dispatch(
        updatUserAddress(
          country,
          city,
          address1,
          address2,
          zipCode,
          addressType
        )
      );
      setOpen(false);
      setCountry("");
      setCity("");
      setAddress1("");
      setAddress2("");
      setZipCode(null);
      setAddressType("");
      setTimeout(()=>{window.location.reload()},500)
    }
  };

  const handleDelete = (item) => {
    const id = item._id;
    dispatch(deleteUserAddress(id));
    toast.success("Removed successfully")
  };

  return (
    <div className="w-full h-full  800px:flex block pb-3 ">
      {open && (
        <div className="fixed w-full h-screen bg-[#0000004b] top-0 left-0 flex items-center justify-center ">
          <div className="w-[90vw] h-full bg-white  rounded shadow relative overflow-y-scroll">
            <div className="w-full flex justify-end p-3">
              <RxCross1
                size={30}
                className="cursor-pointer"
                onClick={() => setOpen(false)}
              />
            </div>
            <h1 className="text-center text-[25px] font-Poppins">
              Add New Address
            </h1>
            <div className="w-full 800px:w-[70%]   pb-3">
              <form onSubmit={handleSubmit} className="w-full">
                <div className="w-full block p-4">
                  <div className="w-full pb-2">
                    <label className="block pb-2">Country</label>
                    <select
                      name=""
                      id=""
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] "
                    >
                      <option value="" className="block border pb-2 ">
                        choose your country
                      </option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2">
                    <label className="block pb-2">Choose your State</label>
                    <select
                      name=""
                      id=""
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px] "
                    >
                      <option value="" className="block border pb-2">
                        choose your state
                      </option>
                      {State &&
                        State.getStatesOfCountry(country).map((item) => (
                          <option
                            className="block pb-2"
                            key={item.isoCode}
                            value={item.isoCode}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="w-full pb-2 ">
                    <label className="block pb-2">Address 1</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                  </div>
                  <div className="w-full pb-2">
                    <label className="block pb-2">Address 2</label>
                    <input
                      type="address"
                      className={`${styles.input}`}
                      required
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  

                  <div className="w-full">
                    <label className="block mb-2 font-medium">Zip Code</label>
                    <input
                      type="text"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      className="w-full p-2 border rounded-lg bg-gray-100"
                      required
                      maxLength="6"
                      placeholder="6-digit zip code"
                    />
                    {!validateZipCode(zipCode) && zipCode?.length > 0 && (
                      <span className="text-red-500 text-sm">
                        Zip code must be exactly 6 digits
                      </span>
                    )}
                  </div>



                  <div className="w-full pb-2">
                    <label className="block pb-2">Address Type</label>
                    <select
                      name=""
                      id=""
                      value={addressType}
                      onChange={(e) => setAddressType(e.target.value)}
                      className="w-[95%] border h-[40px] rounded-[5px]"
                    >
                      <option value="" className="block border pb-2">
                        Choose your Address Type
                      </option>
                      {addressTypeData &&
                        addressTypeData.map((item) => (
                          <option
                            className="block pb-2"
                            key={item.name}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className=" w-full pb-2">
                    <input
                      type="submit"
                      className={`${styles.input} mt-5 cursor-pointer bg-black text-white`}
                      required
                      readOnly
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-full items-center justify-between ml-3">
        <div className="flex items-center border-b pb-2 mb-4">
          <button onClick={() => setOpen(true)} className="text-blue-600 font-medium hover:underline">+ Add a new address</button>
        </div>
      </div>

      <div className="mb-2 ml-3 text-sm text-gray-500">
        {user?.addresses?.length} Saved Addresses
      </div>


      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full h-min 800px:h-[70px] rounded-[4px] flex items-center shadow p-2 justify-between  mb-5"
            key={index}
          >

            <div className="bg-white w-full p-4 shadow-md rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-bold text-lg">{user?.name} <span className="bg-gray-200 text-xs px-2 py-1 rounded ml-2">{item?.addressType}</span></h2>
                  <p className="text-sm text-gray-600">
                    {item?.address1}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item?.address2}
                  </p>
                  <p className="text-sm text-gray-600">
                    {item?.zipCode}
                  </p>
                  <p className="text-sm mt-2">{item?.phoneNumber}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700" onClick={()=>handleDelete(item)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        ))}

      {user && user.addresses.length === 0 && (
        <h5 className="text-center pt-8 text-[18px]">
          You not have any saved address!
        </h5>
      )}
    </div>
  )
}






export default ProfileContent