import {configureStore} from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller"
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";
import { adminReducer } from "./reducers/admin";
import { categoryReducer } from "./reducers/category";

import { subCategoryReducer } from "./reducers/subCategory";
import { subSubCategoryReducer } from "./reducers/subSubCategory";
import { brandReducer } from "./reducers/brand";
import { attributeReducer } from "./reducers/attribute";
import { bannerReducer } from "./reducers/banner";


 const Store  = configureStore({
    reducer:{
        user: userReducer,
        seller : sellerReducer,
        products: productReducer,
        events: eventReducer,
        cart : cartReducer,
        wishlist: wishlistReducer,
        order : orderReducer,
        admin: adminReducer,
        category: categoryReducer,
        subCategory: subCategoryReducer,
        subSubCategory : subSubCategoryReducer,
        brand: brandReducer,
        attribute: attributeReducer,
        banner: bannerReducer
    }
 })

 export default Store