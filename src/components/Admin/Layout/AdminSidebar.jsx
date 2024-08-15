
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BsArrowLeftShort, BsChevronDown, BsSearch } from "react-icons/bs";
import { adminSubMenus } from "../../../static/data";


const AdminSideBar = ({ active, navOpen, setNavOpen }) => {

  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(null);
  const [searchTearm, setSearchTearm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const toggleMenu = (index) => {
    if (subMenuOpen === index) {
      setSubMenuOpen(null);
    } else {
      setSubMenuOpen(index);
    }
  };



  useEffect(() => {
    if (searchTearm) {
      const filterMenu = adminSubMenus.filter((menu) =>
        menu.title.toLowerCase().includes(searchTearm.toLowerCase()) ||
        (menu.subMenu && menu.submenuItems.some(subMenuItem =>
          subMenuItem.title.toLowerCase().includes(searchTearm.toLowerCase())
        ))
      );
      setSearchData(filterMenu);
    } else {
      setSearchData(null);
    }
  }, [searchTearm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const filterMenu = adminSubMenus.filter((menu) =>
      menu.title.toLowerCase().includes(searchTearm.toLowerCase()) ||
      (menu.subMenu && menu.submenuItems.some(subMenuItem =>
        subMenuItem.title.toLowerCase().includes(searchTearm.toLowerCase())
      ))
    );
    setSearchData(filterMenu);
  };

  const menusToDisplay = searchData || adminSubMenus;

  return (
    <section className={`bg-[#2a2589]  max-sm:hidden 1000px:block max-h-screen p-5 pt-8 sticky top-0 left-0 ${open ? "w-72" : "w-20"} duration-300 overflow-y-scroll overflow-x-hidden `} >
      <BsArrowLeftShort className={`bg-white text-[#16162e] text-2xl rounded-full absolute -right-2 top-5 border border-[#461b85] cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />

      <div className={`flex items-center rounded-md bg-[#657082] mt-6 px-4 py-2  ${!open ? "px-2.5" : "px-4"}`}>
        <input
          type="search"
          placeholder="Search"
          className={`text-base border-blue-500 bg-transparent w-full text-white focus:outline-none ${!open && "hidden"}`}
          value={searchTearm}
          onChange={(e) => setSearchTearm(e.target.value)}
        />
        <BsSearch className={`text-white text-lg block float-left cursor-pointer ${open && "mr-2"}`} onClick={handleSearch} />
      </div>

      <ul className="pt-2 " key={""}>
        {menusToDisplay.map((menu, index) => (
          <React.Fragment key={index}>
            <li className={`text-gray-300 text-sm flex items-center gap-x-4  cursor-pointer p-2 hover:bg-[#657082] rounded-md ${menu?.spacing ? "mt-3" : "mt-2"}`} onClick={() => toggleMenu(index)}>
              <Link to={menu?.link} className="text-2xl block float-left hover:scale-110">{menu.icon}</Link>
              <span className={`text-base font-medium flex-1 ${!open && "hidden"}`} >{menu.title}</span>
              {menu.subMenu && (
                <BsChevronDown className={`${subMenuOpen === index && "rotate-180"}`} />
              )}
            </li>
            {menu.subMenu && subMenuOpen === index && open && (
              <ul className="">
                {menu.submenuItems.map((subMenuItem, subIndex) => (
                  <div className="flex items-center justify-between hover:bg-[#657082] rounded-md duration-300" key={subIndex}>
                    <Link to={subMenuItem?.link}>
                      <li className={`text-gray-300 text-sm font-medium flex items-center cursor-pointer p-2   px-7 `}>
                        {subMenuItem.title}
                      </li>



                    </Link>
                    {subMenuItem?.notication && <div className="mr-3 flex items-center justify-center bg-red-400 text-white rounded-full w-6 h-6 text-xs ">{subMenuItem?.notication}</div>}
                  </div>
                ))}
              </ul>
            )}

            {menu?.subHeading && (
              <div className={`m-2 flex items-start `}>
                <h2 className={`text-[#e47a7a] ml-8 font-[500] text-[12px] ${!open && "hidden"}`}>{menu?.subHeading}</h2>
              </div>
            )}
          </React.Fragment>
        ))}
      </ul>
      
      <div className="mt-10 mb-3 mx-3 rounded-lg h-10 text-center flex items-center justify-center text-white bg-[#b7418c]">
        <button className="w-fit">Logout</button>
      </div>
    </section>
  );
};

export default AdminSideBar;