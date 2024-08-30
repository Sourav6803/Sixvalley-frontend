import React, { useCallback, useEffect, useState } from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage, SignupPage, ActivationPage, HomePage, ProductsPage, BestSellingPage, EventsPage, FAQPages, TrackOrderPage,
  ProductDetailsPage, ProfilePage, ShopCreatePage, SellerActivationPage, ShopLoginPage, PaymentPage, OrderSuccessPage,
  OrderDetailsPage, UserInbox, ProductSubcategoryPage, Birthday
} from "./routes/Routes.js"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Store from './redux/store';
import { loadSeller, loadUser, loadAdmin, getAllUsers } from './redux/actions/user';
import ProtectedRoute from './routes/ProtectedRoutes';
import { ShopHomePage } from './ShopRoutes'
import SellerProtectedRoute from './routes/SellerProtectedRoute';
import {
  ShopAllCupon, ShopAllEvent, ShopAllOrders, ShopAllProducts, ShopCreateEvent, ShopCreateProduct, ShopDashboardPage,
  ShopPreviewPage, ShopOrderDetails, ShopAllRefunds, ShopSettingsPage, ShopWithDrawMoneyPage, ShopInboxPage, ShopAllCupoun,
  ShopBannerPage,
  ShopProductView
} from './routes/ShopRoutes';
import { getAllProducts } from './redux/actions/product';
import { getAllEvents } from './redux/actions/event';

import CheckoutPage from './pages/CheckoutPage';
import axios from 'axios';
import { server } from './server';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js"
import {
  AdminLogin, AdminDashboardEvents, AdminDashboardOrders, AdminDashboardPage,
  AdminDashboardProducts, AdminDashboardSellers, AdminDashboardUsers, AdminDashboardWithdraw,
  CategoryPage, UpdateCategoryPage, SubCategoryPage, SubSubCategoryPage, UpdateSubSubCategoryPage, BrandPage, AllBrandPage, UpdateBrandPage,
  CreateProductPage, AttributePage, BannerPage, CouponPage, FlashDealsPage, FlashDealAddProductPage, DealOfTheDayPage, FeatureDealPage,
  FeatureDealAddProductPage, NotificationPage, EventPage
} from './routes/AdminRoutes';

import ProtectedAdminRoute from './routes/ProtectedAdminRoute';
import ShopHomeLayout from './pages/Shop/ShopHomeLayout.jsx';
import { getAllCategories } from './redux/actions/category.js';

import { getAllSubCategories } from './redux/actions/subCategory.js';
import UpdateSubCategoryPage from './pages/admin/UpdateSubCategoryPage.jsx';
import { getAllSubSubCategories } from './redux/actions/subSubCategory.js';
import { getAllBrands } from './redux/actions/brand.js';
import { getAllAttributes } from './redux/actions/attribute.js';
import { getAllSellers } from './redux/actions/sellers.js';
import { getAllBanner } from './redux/actions/banner.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { requestFCMToken } from './utils/firebaseUtils.js';
import CookieConsent from 'react-cookie-consent';
import { useSelector } from 'react-redux';
import FashionPage from './pages/FashionPage.jsx';
import HomeAppliences from './pages/HomeAppliences.jsx';




// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/firebase-messaging-sw.js')
//     .then((registration) => {
//       console.log('Service Worker registered with scope:', registration.scope);
//     }).catch((err) => {
//       console.log('Service Worker registration failed:', err);
//     });
// }


const App = ({ data }) => {
  const clientId = "466795580109-447vuuk7t5e63d2tuagn1443d0lvfhdq.apps.googleusercontent.com"
  const [stripeApikey, setStripeApiKey] = useState("");
  const [fcmToken, setFcmToken] = useState("");
  const [showConsent, setShowConsent] = useState(false);
  const { user, isAuthenticated } = useSelector(state => state.user)

  async function getStripeApikey() {
    const { data } = await axios.get(`${server}/payment/stripeapikey`);
    setStripeApiKey(data.stripeApikey);
  }


  useEffect(() => {
    Store.dispatch(loadUser())
    Store.dispatch(getAllUsers())
    Store.dispatch(loadSeller())
    Store.dispatch(getAllSellers())
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
    Store.dispatch(getAllCategories())
    Store.dispatch(loadAdmin())
    Store.dispatch(getAllSubCategories())
    Store.dispatch(getAllSubSubCategories())
    Store.dispatch(getAllBrands())
    Store.dispatch(getAllAttributes())
    Store.dispatch(getAllBanner())
    getStripeApikey()

  }, [])

  // const checkNotificationPermission = async () => {
  //   const permission = Notification.permission;

  //   if (permission !== 'granted') {
  //     setShowConsent(true);
  //   } else {
  //     setShowConsent(false);
  //     try {
  //       const token = await requestFCMToken();
  //       setFcmToken(token);

  //       // Make API call to update deviceToken
  //       if (isAuthenticated && !user?.deviceToken) {
  //         console.log("update device token api calling")
  //         await axios.put(`${server}/user/update-device-token`, { fcmToken: token }, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           withCredentials: true, // Include cookies with the request
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error during notification setup:", error);
  //     }
  //   }
  // };

  // const handleAccept = async () => {
  //   localStorage.setItem('cookieConsent', 'accepted');

  //   console.log("update device token api calling")

  //   // Request notification permission
  //   const permission = await Notification.requestPermission();
  //   if (permission === 'granted') {
  //     setShowConsent(false);

  //     try {
  //       const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  //       console.log('Service Worker registered with scope:', registration.scope);

  //       const token = await requestFCMToken();
  //       setFcmToken(token);


  //       // Make API call to update deviceToken
  //       if (isAuthenticated && !user?.deviceToken) {
  //         await axios.put(`${server}/user/update-device-token`, { fcmToken: token }, {
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           withCredentials: true, // Include cookies with the request
  //         });
  //       }

  //     } catch (error) {
  //       console.error("Error during notification setup:", error);
  //     }
  //   } else {
  //     console.log('Notification permission not granted');
  //   }
  // };

  // useEffect(() => {
  //   const consent = localStorage.getItem('cookieConsent');

  //   if (consent === null) {
  //     setShowConsent(true);
  //   } else {
  //     checkNotificationPermission()
  //   }
  // }, [checkNotificationPermission]);

  const checkNotificationPermission = useCallback(async () => {
    const permission = Notification.permission;

    if (permission !== 'granted') {
      setShowConsent(true);
    } else {
      setShowConsent(false);
      try {
        const token = await requestFCMToken();
        setFcmToken(token);

        // Make API call to update deviceToken
        if (isAuthenticated && !user?.deviceToken) {
          console.log("update device token api calling");
          await axios.put(`${server}/user/update-device-token`, { fcmToken: token }, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Include cookies with the request
          });
        }
      } catch (error) {
        console.error("Error during notification setup:", error);
      }
    }
  }, [isAuthenticated, user?.deviceToken]);

  const handleAccept = async () => {
    localStorage.setItem('cookieConsent', 'accepted');

    console.log("update device token api calling");

    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setShowConsent(false);

      try {
        const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
        console.log('Service Worker registered with scope:', registration.scope);

        const token = await requestFCMToken();
        setFcmToken(token);

        // Make API call to update deviceToken
        if (isAuthenticated && !user?.deviceToken) {
          await axios.put(`${server}/user/update-device-token`, { fcmToken: token }, {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true, // Include cookies with the request
          });
        }
      } catch (error) {
        console.error("Error during notification setup:", error);
      }
    } else {
      console.log('Notification permission not granted');
    }
  };

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');

    if (consent === null) {
      setShowConsent(true);
    } else {
      checkNotificationPermission();
    }
  }, [checkNotificationPermission]);

  return (
    < BrowserRouter >

      <GoogleOAuthProvider clientId={clientId}>
        {stripeApikey && (
          <Elements stripe={loadStripe(stripeApikey)}>
            <Routes>
              <Route
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Elements>
        )}
        {
          showConsent && <CookieConsent
            location="bottom"
            buttonText="I Accept"
            cookieName="myWebsiteCookieConsent"
            style={{ background: "#2B373B", color: "#fff" }}
            buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
            expires={150} // The cookie will expire in 150 days
            onAccept={handleAccept}
          >
            This website uses cookies to enhance the user experience.
          </CookieConsent>
        }

        {/* <Cookie /> */}
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/sign-up' element={<SignupPage />} />
          <Route path='/activation/:activation_token' element={<ActivationPage />} />
          <Route path='/seller/activation/:activation_token' element={<SellerActivationPage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/products/category/Fashion' element={<FashionPage />} />
          <Route path='/products/category/Home Appliances' element={<HomeAppliences />} />

          <Route path='/productsss' element={<ProductSubcategoryPage />} />
          <Route path='/product/birthday-gift' element={<Birthday />} />

          <Route path='/product/:id' element={<ProductDetailsPage />} />
          <Route path='/best-selling' element={<BestSellingPage />} />
          <Route path='/events' element={<EventsPage />} />
          <Route path='/faq' element={<FAQPages />} />
          <Route path='/profile' element={<ProtectedRoute ><ProfilePage /></ProtectedRoute>} />
          <Route path='/checkout' element={<ProtectedRoute ><CheckoutPage /></ProtectedRoute>} />
          <Route path="/order/success" element={<OrderSuccessPage />} />
          <Route path="/inbox" element={<ProtectedRoute ><UserInbox /></ProtectedRoute>} />
          <Route path='/user/order/:id' element={<ProtectedRoute ><OrderDetailsPage /></ProtectedRoute>} />
          <Route path='/user/track/order/:id' element={<ProtectedRoute ><TrackOrderPage /></ProtectedRoute>} />


          <Route path='/shop-create' element={<ShopCreatePage />} />
          <Route path='/shop-login' element={<ShopLoginPage />} />
          <Route path='/shop/:id' element={<SellerProtectedRoute  ><ShopHomePage /></SellerProtectedRoute>} />
          <Route path='/dashboard' element={<SellerProtectedRoute  ><ShopDashboardPage /></SellerProtectedRoute>} />
          <Route path='/dashboard/product-view/:id' element={<SellerProtectedRoute  ><ShopProductView /></SellerProtectedRoute>} />


          <Route path='/dashboard-create-product' element={<SellerProtectedRoute ><ShopCreateProduct /></SellerProtectedRoute>} />
          <Route path='/dashboard-products' element={<SellerProtectedRoute ><ShopAllProducts /></SellerProtectedRoute>} />
          <Route path='/dashboard/product-view/:id' element={<SellerProtectedRoute ><ShopAllProducts /></SellerProtectedRoute>} />
          <Route path='/dashboard-banner' element={<SellerProtectedRoute ><ShopBannerPage /></SellerProtectedRoute>} />
          <Route path='/dashboard-create-event' element={<SellerProtectedRoute ><ShopCreateEvent /></SellerProtectedRoute>} />
          <Route path='/dashboard-events' element={<SellerProtectedRoute ><ShopAllEvent /></SellerProtectedRoute>} />
          <Route path='/dashboard-refunds' element={<SellerProtectedRoute ><ShopAllRefunds /></SellerProtectedRoute>} />
          <Route path='/dashboard-coupouns' element={<SellerProtectedRoute ><ShopAllCupoun /></SellerProtectedRoute>} />
          <Route path="/shop/preview/:id" element={<ShopPreviewPage />} />
          <Route path="/settings" element={<SellerProtectedRoute ><ShopSettingsPage /></SellerProtectedRoute>} />
          <Route path='/dashboard-orders' element={<SellerProtectedRoute ><ShopAllOrders /></SellerProtectedRoute>} />
          <Route path='/order/:id' element={<SellerProtectedRoute ><ShopOrderDetails /></SellerProtectedRoute>} />
          <Route path="/dashboard-withdraw-money" element={<SellerProtectedRoute> <ShopWithDrawMoneyPage /> </SellerProtectedRoute>} />
          <Route path="/dashboard-messages" element={<SellerProtectedRoute> <ShopInboxPage /> </SellerProtectedRoute>} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<ProtectedAdminRoute> <AdminDashboardPage /> </ProtectedAdminRoute>} />
          <Route path="/admin-users" element={<ProtectedAdminRoute> <AdminDashboardUsers /> </ProtectedAdminRoute>} />
          <Route path="/admin-sellers" element={<ProtectedAdminRoute> <AdminDashboardSellers /></ProtectedAdminRoute>} />
          <Route path="/admin-orders" element={<ProtectedAdminRoute> <AdminDashboardOrders /> </ProtectedAdminRoute>} />
          <Route path="/admin-products" element={<ProtectedAdminRoute> <AdminDashboardProducts /> </ProtectedAdminRoute>} />
          <Route path="/admin-events" element={<ProtectedAdminRoute> <AdminDashboardEvents /> </ProtectedAdminRoute>} />
          <Route path="/admin-withdraw-request" element={<ProtectedAdminRoute>  <AdminDashboardWithdraw /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/category" element={<ProtectedAdminRoute> <CategoryPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/category/:id" element={<ProtectedAdminRoute> <UpdateCategoryPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/sub-category" element={<ProtectedAdminRoute> <SubCategoryPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/subCategory/:id" element={<ProtectedAdminRoute> <UpdateSubCategoryPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/sub-sub-category" element={<ProtectedAdminRoute> <SubSubCategoryPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/subSubCategory/:id" element={<ProtectedAdminRoute> <UpdateSubSubCategoryPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/brand" element={<ProtectedAdminRoute> <BrandPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/all-brand" element={<ProtectedAdminRoute> <AllBrandPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/brand/:id" element={<ProtectedAdminRoute> <UpdateBrandPage /> </ProtectedAdminRoute>} />

          <Route path="/admin/dashboard/add-product" element={<ProtectedAdminRoute> <CreateProductPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/add-attribute" element={<ProtectedAdminRoute> <AttributePage /> </ProtectedAdminRoute>} />

          <Route path="/admin/dashboard/banner" element={<ProtectedAdminRoute> <BannerPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/coupon" element={<ProtectedAdminRoute> <CouponPage /> </ProtectedAdminRoute>} />

          <Route path="/admin/dashboard/flash-deal" element={<ProtectedAdminRoute> <FlashDealsPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/flash-deal/add-product/:id" element={<ProtectedAdminRoute> <FlashDealAddProductPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/deal-of-the-day" element={<ProtectedAdminRoute> <DealOfTheDayPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/featured-deal" element={<ProtectedAdminRoute> <FeatureDealPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/feature-deal/add-product/:id" element={<ProtectedAdminRoute> <FeatureDealAddProductPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/send-notification" element={<ProtectedAdminRoute> <NotificationPage /> </ProtectedAdminRoute>} />
          <Route path="/admin/dashboard/event" element={<ProtectedAdminRoute> <EventPage /> </ProtectedAdminRoute>} />

        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </GoogleOAuthProvider>
    </BrowserRouter >


  )
}

export default App
