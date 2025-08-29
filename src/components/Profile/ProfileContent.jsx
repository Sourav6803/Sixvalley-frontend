import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineArrowRight, AiOutlineCamera } from "react-icons/ai";
import { MdDelete, MdTrackChanges } from "react-icons/md";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
// import { Button } from "@material-ui/core";
import Button from "@mui/material/Button";
import {
  deleteUserAddress,
  updatUserAddress,
  updateUserInformation,
} from "../../redux/actions/user";
import { toast } from "react-toastify";
import axios from "axios";
import { Country, State, City } from "country-state-city";
import { RxCross1 } from "react-icons/rx";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import Loader from "../../pages/Loader";
import districtData from "../../static/india-districts.json";
import { MdEdit, MdLocationOn, MdHome, MdWork } from "react-icons/md";
import { FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const ProfileContent = ({ active }) => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user?.name);
  const [email, setEmail] = useState(user && user?.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user?.phoneNumber);
  const dispatch = useDispatch();
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
    dispatch(updateUserInformation(name, email, phoneNumber)).finally(() => {
      toast.success("Profile updated successfully");
      setLoading(false); // Stop loading after the update completes
    });
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    setImageLoading(true); // Start loading for image upload
    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        toast.error(error);
      })
      .finally(() => {
        setImageLoading(false); // Stop loading after image upload completes
      });
  };

  return (
    <div className="w-full ">
      {/* Profile section */}

      {active === 1 && (
        <>
          <div className="flex justify-center w-full">
            {imageLoading ? (
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
            )}
          </div>
          <br />
          <br />
          <div className="w-full px-5">
            <form onSubmit={handleSubmit}>
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

      {active === 2 && (
        <div>
          <AllOrders />
        </div>
      )}

      {/* Refund */}

      {active === 3 && (
        <div>
          <AllRefundOrders />
        </div>
      )}

      {/* Track order */}

      {active === 5 && (
        <div>
          <TrackOrder />
        </div>
      )}

      {/* Change password */}

      {active === 6 && (
        <div>
          <ChangePassword />
        </div>
      )}

      {/* Address */}

      {active === 7 && (
        <div>
          <Address />
        </div>
      )}
    </div>
  );
};

export const AllOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user?._id));
  }, [dispatch, user?._id]);

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
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

const AllRefundOrders = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, []);

  const eligableOrder =
    orders && orders.filter((item) => item.status === "Refund Success");

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
    });

  return (
    <div className="pl-8 pt-1">
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
};

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user?._id]);

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
    });

  return (
    <div>
      <DataGrid
        rows={row}
        columns={columns}
        pageSize={10}
        disableSelectionOnClick
        autoHeight
      />
    </div>
  );
};

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

// export const Address = () => {
//   const [open, setOpen] = useState(false);
//   const [country, setCountry] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [state, setState] = useState("");

//   const [district, setDistrict] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [city, setCity] = useState("");
//   const [zipCode, setZipCode] = useState();
//   const [address1, setAddress1] = useState("");
//   const [address2, setAddress2] = useState("");
//   const [addressType, setAddressType] = useState("");
//   const { user } = useSelector((state) => state.user);
//   const dispatch = useDispatch();

//   const [address, setAddress] = useState({
//     country: "",
//     state: "",
//     district: "",
//     city: "",
//     village: "",
//     address1: "",
//     address2: "",
//     zipCode: "",
//     addressType: "",
//     location: {
//       type: "Point",
//       coordinates: [] // [longitude, latitude]
//     }
//   });

//   const defaultCountry = {
//     name: "India",
//     isoCode: "IN",
//   };

//   const [states, setStates] = useState([]);
//   const [districts, setDistricts] = useState([]);
//   const [cities, setCities] = useState([]);

//   const [isValid, setIsValid] = useState(false);

//   const addressTypeData = [
//     {
//       name: "Default",
//     },
//     {
//       name: "Home",
//     },
//     {
//       name: "Office",
//     },
//   ];

//   const countries = Country.getAllCountries();
//   const selectedCountry = countries.find((c) => c.isoCode === "IN") || null;

//   const [selectedState, setSelectedState] = useState(null);

//   // Load states of India on component mount
//   useEffect(() => {
//     const initialStates = State.getStatesOfCountry(defaultCountry.isoCode);
//     setStates(initialStates);
//   }, []);

//   const handleStateChange = async (state) => {
//     console.log(state);
//     setSelectedState(state);
//     setAddress((prevData) => ({ ...prevData, state: state.name }));

//     setCities(City.getCitiesOfState(selectedCountry.isoCode, state.isoCode));

//     fetchDistrictsByState(state.name); // fetch districts from local JSON
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
    

//     // Validation: Ensure all fields are filled out and pincode is numeric
//     const allFieldsFilled = Object.values({
//       ...address,
//       [name]: value,
//     }).every((field) => field.trim() !== "");

//     console.log("allFieldsFilled", allFieldsFilled);

//     setIsValid(allFieldsFilled);
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           console.log("Lat:", latitude, "Lng:", longitude);

//           // address state update with location
//           setAddress((prev) => ({
//             ...prev,
//             location: {
//               type: "Point",
//               coordinates: [longitude, latitude] // GeoJSON format
//             }
//           }));
//         },
//         (error) => {
//           console.error("Location fetch failed:", error);
//         }
//       );
//     }
//   }, []);

//   useEffect(() => {
//     const allFieldsFilled = Object.values(address).every(
//       (field) => field?.trim() !== ""
//     );
//     setIsValid(allFieldsFilled);
//   }, [address]);

//   const [location, setLocation] = useState(null);

//   const validateZipCode = (zip) => {
//     return /^\d{6}$/.test(zip); // Exactly 6 digits
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (addressType === "" || country === "" || city === "") {
//       toast.error("Please fill all the fields!*");
//     } else {
//       dispatch(
//         updatUserAddress(
//           country,
//           city,
//           address1,
//           address2,
//           zipCode,
//           addressType
//         )
//       );
//       setOpen(false);
//       setCountry("");
//       setCity("");
//       setAddress1("");
//       setAddress2("");
//       setZipCode(null);
//       setAddressType("");
//       setTimeout(() => {
//         window.location.reload();
//       }, 500);
//     }
//   };

//   const handleDelete = (item) => {
//     const id = item._id;
//     dispatch(deleteUserAddress(id));
//     toast.success("Removed successfully");
//   };

//   const handleUseMyLocation = async () => {
//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;

//         try {
//           const response = await axios.get(
//             "https://api.opencagedata.com/geocode/v1/json",
//             {
//               params: {
//                 key: "505c278939b94c40b75291402921ffb0",
//                 q: `${latitude}+${longitude}`,
//                 pretty: 1,
//               },
//             }
//           );

//           const result = response.data.results[0].components;
//           console.log("result-->", result);

//           // Extract village (fallback to town/county if village doesn't exist)
//         const village = result.village || result.hamlet || result.town || result.county || "";

//         // Extract colony/locality (fallback to suburb/neighbourhood)
//         const colony = result.locality || result.residential || result.suburb || result.neighbourhood || "";

//         console.log("village-->", village);
//         console.log("colony-->", colony);
//           setCountry("IN");
//           setState(result.state);
//           setCity(
//             result.county || result.city_district || result.city || result.town
//           );
//           setAddress1(result.road || "");
//           setAddress2(result.suburb || result.neighbourhood || "");
//           setZipCode(result.postcode || "");


//           setAddress((prevData)=> ({
//             ...prevData,
//             country: result.country,
//             state: result.state,
//             district:  result.state_district|| "",
//             city: result.city || "",
//             address1: result.road || "",
//             address2: result.suburb || result.neighbourhood || "",
//             zipCode: result.postcode || "",
//           }))
//         } catch (err) {
//           toast.error("Failed to auto-detect location");
//           console.error("Location error:", err);
//         }
//       },
//       (err) => {
//         toast.error("Please allow location permission");
//         console.error("Geolocation error:", err);
//       }
//     );
//   };

//   console.log("address-->", address);

//   const fetchDistrictsByState = (stateName) => {
//     const districts = districtData[stateName] || [];
//     setDistricts(districts);
//   };

//   console.log("state-->", state);
//   useEffect(() => {
//     if (state) {
//       fetchDistrictsByState(state);
//     }
//   }, [state]);

//   console.log("districts-->", districts);

//   return (
//     <div className="  800px:flex flex-col block  w-full h-full px-4 py-6 ">
//       <nav className="text-sm text-gray-500 mb-4">
//         Home / My Account /{" "}
//         <span className="text-black font-medium">Saved Addresses</span>
//       </nav>

//       {open && (
//         <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
//           <div className="w-[90vw] max-w-2xl max-h-[95vh] bg-white rounded-2xl shadow-xl overflow-y-auto">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b">
//               <h2 className="text-xl font-semibold">Add New Address</h2>
//               <RxCross1
//                 size={24}
//                 className="cursor-pointer text-gray-500 hover:text-red-500"
//                 onClick={() => setOpen(false)}
//               />
//             </div>

//             {/* Form */}
//             <form onSubmit={handleSubmit} className="p-5 space-y-4">
//               {/* Full Name */}
//               <div>
//                 <label className="block mb-1 font-medium">Full Name</label>
//                 <input
//                   type="text"
//                   value={fullName}
//                   onChange={(e) => setFullName(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                   placeholder="e.g., Sourav Bhukta"
//                   required
//                 />
//               </div>

//               {/* Mobile Number */}
//               <div>
//                 <label className="block mb-1 font-medium">Mobile Number</label>
//                 <input
//                   type="tel"
//                   value={phoneNumber}
//                   onChange={(e) => setPhoneNumber(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                   placeholder="10-digit mobile number"
//                   required
//                   maxLength={10}
//                 />
//               </div>

//               {/* State */}
//               <div>
//                 <label className="block mb-1 font-medium">State</label>
//                 <select
//                   value={state}
//                   onChange={(e) => setState(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                   required
//                 >
//                   <option value="">Choose your state</option>
//                   {State?.getStatesOfCountry("IN").map((item) => (
//                     <option key={item.isoCode} value={item.name}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* District */}
//               <div>
//                 <label className="block mb-1 font-medium">District</label>
//                 <select
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                   required
//                 >
//                   <option value="">Choose your district</option>
//                   {districts.map((item) => (
//                     <option key={item} value={item}>
//                       {item}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div className="w-full pb-2">
//                 <label className="block pb-2"> City</label>
//                 <select
//                   name=""
//                   id=""
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   className="w-[95%] border h-[40px] rounded-[5px] "
//                 >
//                   <option value="" className="block border pb-2">
//                     choose your state
//                   </option>
//                   {State &&
//                     State.getStatesOfCountry(country).map((item) => (
//                       <option
//                         className="block pb-2"
//                         key={item.isoCode}
//                         value={item.isoCode}
//                       >
//                         {item.name}
//                       </option>
//                     ))}
//                 </select>
//               </div>

//               {/* Address 1 */}
//               <div>
//                 <label className="block mb-1 font-medium">Address Line 1</label>
//                 <input
//                   type="text"
//                   value={address1}
//                   onChange={(e) => setAddress1(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                   placeholder="Street, Building No., etc."
//                   required
//                 />
//               </div>

//               {/* Address 2 */}
//               <div>
//                 <label className="block mb-1 font-medium">Address Line 2</label>
//                 <input
//                   type="text"
//                   value={address2}
//                   onChange={(e) => setAddress2(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                   placeholder="Area, Locality, Landmark"
//                   required
//                 />
//               </div>

//               {/* Zip Code */}
//               <div>
//                 <label className="block mb-1 font-medium">Zip Code</label>
//                 <input
//                   type="text"
//                   value={zipCode}
//                   onChange={(e) => setZipCode(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                   placeholder="6-digit PIN code"
//                   required
//                   maxLength={6}
//                 />
//                 {!validateZipCode(zipCode) && zipCode?.length > 0 && (
//                   <p className="text-sm text-red-500 mt-1">
//                     Zip code must be exactly 6 digits
//                   </p>
//                 )}
//               </div>

//               {/* Address Type */}
//               <div>
//                 <label className="block mb-1 font-medium">Address Type</label>
//                 <select
//                   value={addressType}
//                   onChange={(e) => setAddressType(e.target.value)}
//                   className="w-full border rounded-lg h-10 px-3"
//                 >
//                   <option value="">Choose address type</option>
//                   {addressTypeData.map((item) => (
//                     <option key={item.name} value={item.name}>
//                       {item.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               {/* 📍 Use My Location */}
//               <div className="flex justify-between items-center pt-4">
//                 <button
//                   type="button"
//                   onClick={handleUseMyLocation}
//                   className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//                 >
//                   📍 Use My Location
//                 </button>

//                 <button
//                   type="submit"
//                   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//                 >
//                   Save Address
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       <div className="w-full min-h-screen bg-gray-50">
//         {/* Top Bar / Breadcrumb */}
//         <div className="max-w-6xl mx-auto px-4 py-6">
//           {/* Page Title + Add Address */}
//           <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
//             <h1 className="text-2xl font-semibold text-gray-800">
//               Saved Addresses
//             </h1>
//             <button
//               onClick={() => setOpen(true)}
//               className="mt-3 sm:mt-0 inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
//             >
//               + Add New Address
//             </button>
//           </div>

//           {/* Address Count */}
//           <p className="text-gray-600 mb-4">
//             You have{" "}
//             <span className="font-medium">{user?.addresses?.length}</span> saved{" "}
//             {user?.addresses?.length === 1 ? "address" : "addresses"}
//           </p>

//           {/* Address List */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//             {user?.addresses?.map((item, index) => (
//               <div
//                 key={index}
//                 className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition"
//               >
//                 <div className="flex justify-between items-start">
//                   <div className="space-y-1">
//                     <h2 className="text-base font-semibold text-gray-800">
//                       {user?.name}
//                       <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full uppercase">
//                         {item?.addressType}
//                       </span>
//                     </h2>
//                     <p className="text-sm text-gray-600">{item?.address1}</p>
//                     <p className="text-sm text-gray-600">{item?.address2}</p>
//                     <p className="text-sm text-gray-600">
//                       ZIP: {item?.zipCode}
//                     </p>
//                     <p className="text-sm text-gray-700 pt-2 font-medium">
//                       📞 {user?.phoneNumber}
//                     </p>
//                   </div>

//                   <div className="flex flex-col gap-2 ">
//                     <button
//                       onClick={() => handleDelete(item)}
//                       className="text-red-500 hover:text-red-700 text-sm"
//                     >
//                       <MdDelete size={25} />
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* No Addresses */}
//           {user?.addresses?.length === 0 && (
//             <div className="text-center py-16">
//               <p className="text-gray-500 mb-4">
//                 You haven't saved any address yet.
//               </p>
//               <button
//                 onClick={() => setOpen(true)}
//                 className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition"
//               >
//                 Add Your First Address
//               </button>
//             </div>
//           )}

//           {/* Tips / Info */}
//           <div className="bg-white mt-12 p-6 rounded-xl shadow-sm">
//             <h3 className="text-lg font-semibold mb-2 text-gray-800">
//               Why save an address?
//             </h3>
//             <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
//               <li>Faster checkout during future orders</li>
//               <li>Ensure delivery to the correct location</li>
//               <li>Easily manage multiple delivery addresses</li>
//             </ul>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="mt-20 border-t pt-8 pb-12 text-center text-sm text-gray-400">
//           © {new Date().getFullYear()} YourBrand. All rights reserved.
//         </div>
//       </div>
//     </div>
//   );
// };

export const Address = () => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: null,
    country: "India",
    state: "",
    district: "",
    city: "",
    address1: "",
    address2: "",
    zipCode: "",
    addressType: "Home",
    location: {
      type: "Point",
      coordinates: [],
    },
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingLocation, setLoadingLocation] = useState(false);

  const addressTypes = [
    { name: "Home", icon: <MdHome className="mr-1" /> },
    { name: "Work", icon: <MdWork className="mr-1" /> },
    { name: "Other", icon: <MdLocationOn className="mr-1" /> },
  ];

  // Load states on mount
  useEffect(() => {
    const initialStates = State.getStatesOfCountry("IN");
    setStates(initialStates);
  }, []);

  // Load districts when state changes
  useEffect(() => {
    if (formData.state) {
      const stateObj = states.find((s) => s.name === formData.state);
      if (stateObj) {
        const stateCities = City.getCitiesOfState("IN", stateObj.isoCode);
        setCities(stateCities);
        fetchDistrictsByState(formData.state);
      }
    }
  }, [formData.state, states]);

  const fetchDistrictsByState = (stateName) => {
    const districts = districtData[stateName] || [];
    setDistricts(districts);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUseMyLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const response = await axios.get(
            "https://api.opencagedata.com/geocode/v1/json",
            {
              params: {
                key: "505c278939b94c40b75291402921ffb0",
                q: `${latitude},${longitude}`,
                pretty: 1,
              },
            }
          );

          console.log("lat-->", latitude, "long-->", longitude)

          const result = response.data.results[0].components;
          setFormData({
            ...formData,
            country: result.country || "India",
            state: result.state || "",
            city: result.city || result.town || "",
            district: result.state_district || "",
            address1: result.road || "",
            address2: result.suburb || result.neighbourhood || "",
            zipCode: result.postcode || "",
            location: {
              type: "Point",
              coordinates: [longitude, latitude],
            },
          });
          toast.success("Location detected successfully!");
        } catch (error) {
          toast.error("Failed to fetch location details");
          console.error("Geolocation error:", error);
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        toast.error("Please enable location permissions");
        console.error("Geolocation error:", error);
        setLoadingLocation(false);
      }
    );
  };

  console.log("form data-->", formData)

  const geocodeAddress = async (addressData) => {
    try {
      const response = await axios.get(
        "https://api.opencagedata.com/geocode/v1/json",
        {
          params: {
            q: `${addressData.address1}, ${addressData.city}, ${addressData.state}, ${addressData.country}, ${addressData.zipCode}`,
            key: "505c278939b94c40b75291402921ffb0",
            limit: 1,
          },
        }
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        return {
          type: "Point",
          coordinates: [lng, lat], // GeoJSON format: [longitude, latitude]
        };
      }
      return null;
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "phoneNumber",
      "state",
      "district",
      "city",
      "address1",
      "zipCode",
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(`Please fill in the ${field.replace(/([A-Z])/g, " $1").toLowerCase()}`);
        return false;
      }
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    if (!/^\d{6}$/.test(formData.zipCode)) {
      toast.error("Please enter a valid 6-digit ZIP code");
      return false;
    }

    return true;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   dispatch(
  //     updatUserAddress(formData)
  //   );

  //   resetForm();
  //   setOpen(false);
  //   toast.success(
  //     editMode ? "Address updated successfully!" : "Address added successfully!"
  //   );
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      // If location isn't set or coordinates are empty, geocode the address
      let finalFormData = { ...formData };

      if (
        !finalFormData.location?.coordinates ||
        finalFormData.location.coordinates.length === 0
      ) {
        const geocodedLocation = await geocodeAddress(finalFormData);
        if (geocodedLocation) {
          finalFormData.location = geocodedLocation;
        } else {
          
          finalFormData.location = {
            type: "Point",
            coordinates: [],
          };
        }
      }

      dispatch(updatUserAddress(finalFormData));

      resetForm();
      setOpen(false);
      toast.success(
        editMode
          ? "Address updated successfully!"
          : "Address added successfully!"
      );
    } catch (error) {
      toast.error("Failed to process address location");
      console.error("Address submission error:", error);
    }
  };


  const handleEdit = (address) => {
    setCurrentAddress(address);
    setEditMode(true);
    setFormData({
      fullName: user?.name || "",
      phoneNumber: user?.phoneNumber || "",
      country: address.country || "India",
      state: address.state || "",
      district: address.district || "",
      city: address.city || "",
      address1: address.address1 || "",
      address2: address.address2 || "",
      zipCode: address.zipCode || "",
      addressType: address.addressType || "Home",
      location: address.location || {
        type: "Point",
        coordinates: [],
      },
    });
    setOpen(true);
  };

  const handleDelete = (address) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      dispatch(deleteUserAddress(address._id));
      toast.success("Address deleted successfully");
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      phoneNumber: "",
      country: "India",
      state: "",
      district: "",
      city: "",
      address1: "",
      address2: "",
      zipCode: "",
      addressType: "Home",
      location: {
        type: "Point",
        coordinates: [],
      },
    });
    setEditMode(false);
    setCurrentAddress(null);
  };

  const getAddressIcon = (type) => {
    switch (type) {
      case "Home":
        return <MdHome className="text-blue-500" />;
      case "Work":
        return <MdWork className="text-green-500" />;
      default:
        return <MdLocationOn className="text-purple-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 w-full">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-600 mb-8">
        <a href="/" className="hover:text-blue-600">
          Home
        </a>
        <span className="mx-2">/</span>
        <a href="/account" className="hover:text-blue-600">
          My Account
        </a>
        <span className="mx-2">/</span>
        <span className="text-gray-800 font-medium">Addresses</span>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              My Addresses
            </h1>
            <p className="text-gray-600 mt-2">
              {user?.addresses?.length || 0} saved address
              {user?.addresses?.length !== 1 ? "es" : ""}
            </p>
          </div>
          <button
            onClick={() => {
              resetForm();
              setOpen(true);
            }}
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            + Add New Address
          </button>
        </div>

        {/* Address List */}
        {user?.addresses?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.addresses.map((address, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      {getAddressIcon(address.addressType)}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {address.addressType}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(address)}
                        className="text-gray-500 hover:text-blue-600"
                        aria-label="Edit address"
                      >
                        <MdEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(address)}
                        className="text-gray-500 hover:text-red-600"
                        aria-label="Delete address"
                      >
                        <MdDelete size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {user.name}
                    </h3>
                    <div className="mt-2 space-y-1 text-sm text-gray-600">
                      <p>{address.address1}</p>
                      {address.address2 && <p>{address.address2}</p>}
                      <p>
                        {address.city}, {address.district}, {address.state}
                      </p>
                      <p>India - {address.zipCode}</p>
                    </div>

                    <div className="mt-4 flex items-center text-sm text-gray-500">
                      <FaPhoneAlt className="mr-1" />
                      <span>{user.phoneNumber}</span>
                    </div>

                    {address.location?.coordinates?.length === 2 && (
                      <div className="mt-3">
                        <a
                          href={`https://www.google.com/maps?q=${address.location.coordinates[1]},${address.location.coordinates[0]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                        >
                          <FaMapMarkerAlt className="mr-1" />
                          View on Map
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
              <MdLocationOn className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-2 text-lg font-medium text-gray-900">
              No saved addresses
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding your first delivery address.
            </p>
            <div className="mt-6">
              <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                + Add Address
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Address Modal */}
      {open && (
        <div className="fixed inset-0 overflow-y-auto z-50">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={() => setOpen(false)}
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editMode ? "Edit Address" : "Add New Address"}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                    onClick={() => setOpen(false)}
                  >
                    <RxCross1 size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  {/* Full Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      maxLength="10"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State *
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option key={state.isoCode} value={state.name}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label
                      htmlFor="district"
                      className="block text-sm font-medium text-gray-700"
                    >
                      District *
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                      disabled={!formData.state}
                    >
                      <option value="">Select District</option>
                      {districts.map((district, index) => (
                        <option key={index} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700"
                    >
                      City/Town/Village *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Address Line 1 */}
                  <div>
                    <label
                      htmlFor="address1"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 1 (House No, Building, Street) *
                    </label>
                    <input
                      type="text"
                      id="address1"
                      name="address1"
                      value={formData.address1}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div>
                    <label
                      htmlFor="address2"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Line 2 (Area, Locality)
                    </label>
                    <input
                      type="text"
                      id="address2"
                      name="address2"
                      value={formData.address2}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </div>

                  {/* ZIP Code */}
                  <div>
                    <label
                      htmlFor="zipCode"
                      className="block text-sm font-medium text-gray-700"
                    >
                      ZIP Code *
                    </label>
                    <input
                      type="number"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      maxLength="6"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      required
                    />
                  </div>

                  {/* Address Type */}
                  <div>
                    <label
                      htmlFor="addressType"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address Type
                    </label>
                    <div className="mt-1 grid grid-cols-3 gap-3">
                      {addressTypes.map((type) => (
                        <label
                          key={type.name}
                          className={`flex items-center justify-center px-4 py-2 border rounded-md cursor-pointer ${
                            formData.addressType === type.name
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-300"
                          }`}
                        >
                          <input
                            type="radio"
                            name="addressType"
                            value={type.name}
                            checked={formData.addressType === type.name}
                            onChange={handleInputChange}
                            className="sr-only"
                          />
                          <span className="flex items-center">
                            {type.icon}
                            {type.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Location Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleUseMyLocation}
                      disabled={loadingLocation}
                      className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        loadingLocation ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {loadingLocation ? (
                        "Detecting location..."
                      ) : (
                        <>
                          <FaMapMarkerAlt className="mr-2" />
                          Use My Current Location
                        </>
                      )}
                    </button>
                  </div>

                  {/* Form Actions */}
                  <div className="pt-4 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {editMode ? "Update Address" : "Save Address"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
