import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import Loader from "../pages/Loader"



const SellerProtectedRoute = ({ children }) => {
    const { isLoading, isSeller, seller } = useSelector((state) => state?.seller)
    
    console.log(`isLoading : ${isLoading},  isSeller ${isSeller}`)

    if (isLoading === true || isSeller === undefined) {
        return (
            <div className="flex items-center justify-center h-screen absolute inset-0 bg-gray-900/10">
                <Loader />
            </div>
        )
    } else {
        if (isSeller === undefined ) {
            return <Navigate to={`/shop-login`} replace />
        }
    }
    return children
}

export default SellerProtectedRoute

// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

// const SellerProtectedRoute = ({ children }) => {
//   const { isLoading, isSeller } = useSelector((state) => state.seller);
//     console.log("selellr", isSeller)
//     console.log("isLoading bbb", isLoading)
    
//   if (isLoading) {
//     return <Loader />;
//   }

//   if (!isSeller) {
//     return <Navigate to="/shop-login" replace />;
//   }

//   return children;
// };

// export default SellerProtectedRoute;