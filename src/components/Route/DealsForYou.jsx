import React from 'react';


const DealsForYou = () => {
  const deals = [
    {
      id: 1,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/sticker/o/x/w/medium-wall-stickers-wallpaper-happy-winter-trees-and-frames-original-imaggjhss3zgvzdy.jpeg?q=70&crop=false',
      discount: '88%',
      label: 'Limited time deal',
    },
    {
      id: 2,
      image: 'https://rukminim2.flixcart.com/image/416/416/kskotjk0/curtain/t/a/a/treepunch-304-long-door-treepunch-015-eyelet-kraftiq-homes-original-imag64ernj4eswhf.jpeg?q=70&crop=false',
      discount: '60%',
      label: 'Limited time deal',
    },
    {
      id: 3,
      image: 'https://rukminim2.flixcart.com/image/416/416/kst9gnk0/home-temple/r/c/l/22-32-0-49-inf434-infinitys-45-original-imag6ak2g8jhdjzw.jpeg?q=70&crop=false',
      discount: '47%',
      label: 'Limited time deal',
    },
    {
      id: 4,
      image: 'https://rukminim2.flixcart.com/image/416/416/xif0q/electric-insect-killer/r/3/h/-original-imahykuuyx6r4z6f.jpeg?q=70&crop=false',
      discount: '12%',
      label: 'Limited time deal',
    },
  ];

  return (
    <div className="bg-white p-1">
      <h2 className="text-xl font-bold mb-4">Deals for you</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {deals.map((deal) => (
          <div key={deal.id} className="border  rounded-lg shadow-lg p-1">
            <img src={deal.image} alt="deal" className="w-full h-48 object-cover rounded-md mb-4" />
            <div className="flex justify-between  items-center">
              <div className=" bg-red-500  px-2 py-1 text-white rounded-md font-semibold text-xs">{deal.discount} off</div>
              <div className=" text-red-600  font-semibold text-xs">
                {deal.label}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <a href="#" className="text-teal-600 hover:underline">
          See all deals
        </a>
      </div>
    </div>
  );
};

export default DealsForYou;
