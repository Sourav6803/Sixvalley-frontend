import React from "react";
import SellOnline from "../../components/Shop/welcome/SellOnline";
import Navbar from "../../components/Shop/Layout/Navbar";

const SellOnlinePage = () => {
  
  return (
    <main className="relative">
      <Navbar />
      
      <div className="flex  w-full">
        <section className="flex w-full min-h-screen  flex-1 flex-col px-0 pb-5 pt-1 max-md:pb-14 sm:px-0">
          <div className="w-full">
            <SellOnline />
          </div>
        </section>
      </div>
    </main>
  );
};

export default SellOnlinePage;
