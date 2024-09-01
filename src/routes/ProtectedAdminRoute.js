import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../pages/Loader";

// const ProtectedAdminRoute = ({ children }) => {
//   const { loading, isAuthenticated,user } = useSelector((state) => state.user);
//   if (loading === false) {
//     if (!isAuthenticated) {
//       return <Navigate to="/login" replace />;
//     } else if(user.role !== "Admin"){
//         return <Navigate to="/" replace />;
//     }
//     return children;
//   }
// };


const ProtectedAdminRoute = ({ children }) => {
  const { isLoading, isAdmin,  } = useSelector((state) => state.admin);

  if (isLoading === true) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    )
  } else {
    if (!isAdmin) {
      return <Navigate to={`/admin/login`} replace />
    }
  }
  return children
};

export default ProtectedAdminRoute;
