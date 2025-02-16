import React from "react";

const testimonials = [
  {
    name: "Amit and Rajat Jain",
    business: "Smartees, Tiruppur",
    feedback:
      "Our business has grown beyond our imagination, getting upto 10,000 orders consistently during sale days. We are now constantly bringing new products thanks to Meesho's insights.",
    image: "https://media.istockphoto.com/id/1461540763/photo/a-successful-seller-is-standing-at-supermarket-with-arms-crossed-and-smiling-at-the-camera.jpg?s=612x612&w=0&k=20&c=rlBT0EqViF-mXghxffqm0kOxNwaZCsYJLskkgeRGCMA=", // Replace with real image URLs
  },
  {
    name: "Suman",
    business: "Keshav Fashion, Hisar",
    feedback:
      "I started selling on Meesho with 4-5 orders on the very first day. In no time I was getting over 1000 orders a day, like a dream come true. The journey has been truly remarkable, thanks to Meesho.",
    image: "https://t3.ftcdn.net/jpg/05/53/45/70/360_F_553457018_vlgd32DETJMv98AHSo1CeL81CiQCt5v6.jpg", // Replace with real image URLs
  },
  {
    name: "Mohit Rathi",
    business: "Meira Jewellery, Ahmedabad",
    feedback:
      "Meesho made it extremely simple to transition to online business during lockdown. Suddenly we were all over India to our surprise, seeing up to 5X growth on sale days. It's been an amazing journey.",
    image: "https://images.livemint.com/rf/Image-621x414/LiveMint/Period2/2017/09/28/Photos/Processed/tobacco-kXwG--621x414@LiveMint.jpg", // Replace with real image URLs
  },
  // {
  //   name: "New User",
  //   business: "Another Business, City",
  //   feedback:
  //     "Adding a longer testimonial to test the responsiveness and behavior of the layout with more content. This should work seamlessly without breaking the design!",
  //   image: "https://via.placeholder.com/300", // Replace with real image URLs
  // },
];

const Slider = () => {
  return (
    <div className="py-8 bg-gray-50">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6">
        Experiences suppliers love to talk about
      </h2>
      <div className="overflow-x-auto">
        <div className="flex  px-4 md:px-8 justify-between">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex-none w-[90%] sm:w-80 bg-white shadow-md rounded-lg p-4 transition-transform transform duration-300"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-[200px] object-cover rounded-t-lg"
              />
              <div className="mt-4">
                <h3 className="font-bold text-lg">{testimonial.name}</h3>
                <p className="text-sm text-gray-500">{testimonial.business}</p>
                <p className="mt-2 text-sm text-gray-700 line-clamp-4">
                  {testimonial.feedback}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
