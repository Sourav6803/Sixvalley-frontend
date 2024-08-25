import React, { useEffect, useState } from 'react'

const Cookie = () => {
    const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setShowConsent(false);
  };

  // if (!showConsent) return null;
    return (
        <section className="fixed bottom-0 w-full bg-gray-50 dark:bg-gray-800 z-100000000000000">
            <div className="container px-4 py-8 mx-auto lg:flex lg:items-center lg:gap-x-16">
                <p className="text-gray-600 dark:text-gray-300">By clicking “Accept All Cookies”, you agree to the storing of cookies on your device to enhance site navigation, analyze site usage, and assist in our marketing efforts.</p>

                <div className="flex items-center mt-6 gap-x-4 lg:gap-x-8 shrink-0 lg:mt-0">
                    <button className="w-1/2 text-sm text-gray-800 underline transition-colors duration-300 md:w-auto dark:text-white dark:hover:text-gray-400 hover:text-gray-600 focus:outline-none">
                        Cookie Setting
                    </button>

                    <button onClick={handleAccept} className=" text-sm w-1/2 md:w-auto font-medium bg-gray-900 rounded-lg hover:bg-gray-900/80 text-white px-4 py-2.5 duration-300 transition-colors focus:outline-none">
                        Accept All Cookies
                    </button>
                </div>
            </div>
        </section>
    )
}

export default Cookie