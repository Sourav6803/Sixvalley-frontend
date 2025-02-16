import React from "react";
import Navbar from "../../components/Shop/Layout/Navbar";
import ShippingReturn from "../../components/Shop/welcome/ShippingReturn";
import Footer from "../../components/Shop/Layout/Footer";

const ShopShippingReturnPage = () => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <section className="flex min-h-screen flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0">
          <div className="w-full">
            <ShippingReturn />
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default ShopShippingReturnPage;
