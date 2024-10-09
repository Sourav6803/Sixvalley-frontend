import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

import { BiSolidCoupon } from "react-icons/bi";
import { FaChevronRight } from "react-icons/fa";

const Checkout = () => {
  const { user } = useSelector((state) => state?.user);
  const { cart } = useSelector((state) => state?.cart);
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [zipCode, setZipCode] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const [couponAmount, setCouponAmount] = useState(0)

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item?.qty * item?.afterDiscountPrice,
    0
  );

  // this is shipping cost variable
  const shipping = cart?.reduce(
    (acc, item) => acc + item?.shippingCost,
    0
  );

  const totalOriginalPrice = cart?.reduce(
    (acc, item) => acc + item?.qty * item?.originalPrice,
    0
  );

  const totalPrice = cart?.reduce(
    (acc, item) => acc + item?.qty * item?.afterDiscountPrice,
    0
  );

  const totalDiscountPrice = cart?.reduce(
    (acc, item) => acc + item?.qty * (item?.originalPrice - item?.afterDiscountPrice),
    0
  );

  const deliverCharge = shipping

  const totalCartPrice = totalPrice + shipping - couponAmount

  const paymentSubmit = () => {
    if (address1 === "" || address2 === "" || zipCode === null || country === "" || city === "") {
      toast.error("Please choose your delivery address!")
    } else {
      const shippingAddress = {
        address1, address2, zipCode, country, city
      };

      const orderData = { cart, totalOriginalPrice, totalDiscountPrice, totalPrice, couponAmount, subTotalPrice, deliverCharge, shipping, discountPrice, shippingAddress, user, couponCode, totalCartPrice }

      // update local storage with the updated orders array
      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/payment");
    }
  };

  const discountPercentenge = couponCodeData ? discountPrice : "";

  return (
    <div className="w-full flex flex-col items-center py-3">
      <div className="w-[100%] 1000px:w-[70%] block 800px:flex">

        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            city={city}
            setCity={setCity}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>

        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData

            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentenge={discountPercentenge}
            cart={cart}
            totalOriginalPrice={totalOriginalPrice}
            totalDiscountPrice={totalDiscountPrice}
            totalCartPrice={totalCartPrice}
            fixedDeliveryCharge={shipping}
            user={user}
            setCouponAmount={setCouponAmount}
            setDiscountPrice={setDiscountPrice}
          />
        </div>

      </div>

      <div className="flex w-full max-w-3xl items-center justify-between mx-auto p-4 bg-white shadow-lg rounded-md">
        {/* Payment Amount Section */}
        <div className="mt-5">
          <h5 className="text-md font-semibold text-gray-700">Your Payment Amount</h5>
          <h5 className="text-xl font-bold text-gray-900">₹ {totalCartPrice}</h5>
        </div>

        {/* Payment Button */}
        <div
          className="bg-blue-600 mt-5 py-3 px-6 rounded-lg cursor-pointer hover:bg-blue-700 transition duration-300"
          onClick={paymentSubmit}
        >
          <h5 className="text-white font-semibold text-lg">Go to Payment</h5>
        </div>
      </div>

    </div>
  );
};


const ShippingInfo = ({
  user,
  country,
  setCountry,
  city,
  setCity,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {

  const [selectedAddress, setSelectedAddress] = useState({
    address1: '',
    address2: '',
    zipCode: '',
    country: '',
    city: '',
  });

  const navigate = useNavigate()

  useEffect(() => {
    if (user?.addresses?.length) {
      // Set the default address if available
      const defaultAddress = user.addresses[0]; // Assuming the first address is the default
      setAddress1(defaultAddress.address1);
      setAddress2(defaultAddress.address2);
      setZipCode(defaultAddress.zipCode);
      setCountry(defaultAddress.country);
      setCity(defaultAddress.city);
      setSelectedAddress(defaultAddress);
    }
  }, [user?.addresses, setAddress1, setAddress2, setCity, setCountry, setZipCode]);

  const handleAddressChange = (item) => {
    setSelectedAddress({
      address1: item.address1,
      address2: item.address2,
      zipCode: item.zipCode,
      country: item.country,
      city: item.city,
    });
    setAddress1(item.address1);
    setAddress2(item.address2);
    setZipCode(item.zipCode);
    setCountry(item.country);
    setCity(item.city);
  };

  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-2">
      <div className="flex items-center justify-between px-1">
        <h5 className="text-[18px] font-[500]">Shipping Address</h5>
        {user?.addresses?.length > 0 && (
          <button
            onClick={() => setUserInfo(!userInfo)}
            className="text-blue-600 font-medium py-1 px-3 border rounded-md border-gray-600 cursor-pointer"
          >
            {userInfo ? 'Hide Address' : 'Change Address'}
          </button>
        )}
      </div>
      <br />

      {user?.addresses?.length > 0 ? (
        <div className="flex items-center justify-between gap-1">
          <div>
            <p>Deliver to: {user?.name?.length > 8 ? user?.name?.slice(0, 8) : user.name}, {zipCode}</p>
            <p className="text-slate-500">
              {address1}, {address2}, {city}
            </p>
            <p>{user?.phoneNumber ? user?.phoneNumber : "7908104000 "} </p>
          </div>

          {userInfo && (
            <div>
              {user?.addresses.map((item, index) => (
                <div className="w-full flex mt-1" key={index}>
                  <input
                    type="radio"
                    className="mr-3"
                    value={item.addressType}
                    checked={selectedAddress.address1 === item.address1 &&
                      selectedAddress.address2 === item.address2 &&
                      selectedAddress.zipCode === item.zipCode &&
                      selectedAddress.country === item.country &&
                      selectedAddress.city === item.city}
                    onClick={() => handleAddressChange(item)}
                  />
                  <h2>{item.addressType}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div>
          <p className="text-red-600">No addresses found. Please add a new address.</p>
          <button onClick={() => navigate("/user/address")} className="text-blue-600 font-medium hover:underline">+ Add a new address</button>
        </div>

      )}
    </div>
  );
};


const CartData = ({
  user,
  setCouponCode,
  totalCartPrice,
  totalDiscountPrice,
  totalOriginalPrice,
  fixedDeliveryCharge,
  cart,
  setCouponAmount,
  setDiscountPrice
}) => {
  const [coupon, setCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [allCoupons, setAllCoupons] = useState([]);
  const [loadingCouponCode, setLoadingCouponCode] = useState(null);
  const [appliedCouponCode, setAppliedCouponCode] = useState(null); // Track applied coupon


  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  if (coupon !== null) {
    setCouponAmount(coupon?.discountAmount)
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth();
    const year = date.getUTCFullYear();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const formattedDate = `${day.toString().padStart(2, '0')} ${monthNames[month]}, ${year.toString().slice(-2)}`;
    return formattedDate;
  }

  useEffect(() => {
    const fetchCoupons = async () => {
      setLoadingCouponCode(null);
      try {
        const res = await axios.get(`${server}/cupon/active`, { withCredentials: true });
        setAllCoupons(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons();
  }, [user?._id]);

  const claimCoupon = async (code) => {
    if (!code) {
      toast.error('Please enter a coupon code');
      return;
    }

    setLoadingCouponCode(code);
    try {
      const response = await axios.post(`${server}/cupon/availabe-coupon`, {
        id: user?._id,
        couponCode: code,
      });
      const appliedCoupon = response.data;

      if (appliedCoupon) {
        setCouponCode(code);
        setCoupon(appliedCoupon?.coupon);
        setAppliedCouponCode(code); // Mark the coupon as applied
        toast.success('Coupon applied successfully!');
      } else {
        toast.error('Failed to apply coupon. Please try again.');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An error occurred while applying the coupon.');
    } finally {
      setLoadingCouponCode(null);
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    setCouponCode(null);
    setAppliedCouponCode(null); // Clear the applied coupon
    toast.success('Coupon removed successfully!');
  };

  const calculateDiscount = () => {
    if (!coupon || !cart.length) return 0;

    const eligibleItems = cart.filter(item => item.shopId === coupon.shopId);
    const eligiblePrice = eligibleItems.reduce(
      (acc, item) => acc + item.qty * item.afterDiscountPrice,
      0
    );

    if (coupon?.discountType === 'Percent') {
      return ((eligiblePrice * coupon?.discountAmount) / 100);
    } else if (coupon?.discountType === 'Amount') {
      return coupon?.discountAmount;
    }

    return 0;
  };

  const discountPrice = calculateDiscount();
  if (discountPrice) {
    setDiscountPrice(discountPrice)
  }
  const finalPrice = totalCartPrice - discountPrice;

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6">
      <div className="mb-4">
        <div className="bg-gray-200 text-gray-800 px-4 py-2 font-semibold rounded-t-md">Coupons</div>

        <div className="bg-white flex justify-between items-center p-1 border-b">
          <div className="flex items-center gap-2">
            <BiSolidCoupon size={25} />
            <h2 className="font-bold text-gray-600">Best Coupon for you</h2>
          </div>
          <div className="flex items-center cursor-pointer">
            <h2 className="font-semibold text-blue-600" onClick={() => toggleTab(2)}>All Coupons</h2>
            <FaChevronRight size={15} color="blue" className="ml-1" />
          </div>
        </div>

        {activeTab === 2 && (
          <div>
            {allCoupons && allCoupons.map((coupon, index) => {
              const eligibleItems = cart.filter(
                item => coupon.couponCategory === "All" || item.category === coupon.couponCategory
              );

              const eligiblePrice = eligibleItems.reduce(
                (acc, item) => acc + item.qty * item.afterDiscountPrice,
                0
              );

              const isEligible = eligiblePrice >= coupon.minPurchase;
              const isApplied = appliedCouponCode === coupon.couponCode; // Check if this coupon is applied

              return (
                <div key={index} className="mb-4">
                  <h3 className="text-sm font-semibold text-gray-500">Extra ₹{coupon?.discountAmount} Off on orders above ₹{coupon?.minPurchase}</h3>
                  <h3 className="text-sm font-semibold text-gray-600">
                    Best price ₹{totalCartPrice - coupon?.discountAmount} with coupon{' '}
                    <span className="font-bold">{coupon.couponCode}</span>.
                  </h3>
                  <p className="text-sm text-gray-600">
                    Expires on {formatDate(coupon?.expireDate)}
                  </p>
                  {coupon.couponType === 'First Order' && (
                    <p className="text-sm text-green-700 italic">First time only</p>
                  )}

                  {coupon?.couponCategory !== "All" && (
                    <p className="text-sm text-green-700 italic">This coupon only valid for {coupon?.couponCategory}</p>
                  )}

                  <div className="flex justify-between items-center mt-2">
                    <div className="bg-green-100 border border-dashed border-gray-700 px-2 py-1 font-bold rounded-md">
                      {coupon.couponCode}
                    </div>

                    <div
                      className={`border px-2 py-0.5 rounded-md text-blue-600 cursor-pointer ${!isEligible || (loadingCouponCode && !isApplied) ? 'cursor-not-allowed opacity-50' : 'border-blue-600'}`}
                      onClick={() => {
                        if (isApplied) {
                          removeCoupon();
                        } else if (isEligible && !loadingCouponCode) {
                          claimCoupon(coupon.couponCode);
                        }
                      }}

                      disabled={!isEligible || (loadingCouponCode && !isApplied)}
                    >
                      {isApplied ? 'Remove' : (loadingCouponCode === coupon.couponCode ? 'Applying...' : 'Apply')}
                    </div>


                  </div>
                  <hr className="mx-auto mt-2" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Price Details Section */}
      <div className="mb-4">
        <h1 className="text-gray-700 text-xl font-medium">Price Details</h1>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-700 font-medium">Price ({cart?.length} item)</p>
        <p className="text-gray-700 font-medium">₹{totalOriginalPrice}</p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-700 font-medium">Discount</p>
        <p className="text-green-700 font-medium">-₹{totalDiscountPrice}</p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600 font-medium">Coupons for you</p>
        <p className="text-gray-600 font-medium">-₹{discountPrice}</p>
      </div>

      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600 font-medium">Delivery charges</p>
        <h1 className="text-gray-600 font-medium flex items-center gap-2">
          {fixedDeliveryCharge === 0 && <span className="line-through">₹{cart?.length * 40}</span>}
          {fixedDeliveryCharge === 0 ? (
            <p className="text-green-700 text-sm">Free delivery</p>
          ) : (
            "₹" + fixedDeliveryCharge
          )}
        </h1>
      </div>

      <hr className="mt-4" />

      <div className="flex justify-between items-center my-4">
        <p className="text-gray-900 font-medium">Total Amount</p>
        <p className="text-gray-900 font-medium">₹{finalPrice}</p>
      </div>

      <div className="flex justify-between items-center mb-4">
        <p className="text-green-700 font-medium">You will save ₹{!discountPrice ? totalDiscountPrice : discountPrice + totalDiscountPrice} on this order.</p>
      </div>
    </div>
  );
};

export default Checkout;










