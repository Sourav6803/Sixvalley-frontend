


import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectBrand = ({ category, allBrands, addBrandHandler, dropdownOpen, setDropdownOpen, toggleDropdown }) => {
    const [brand, setBrand] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBrands, setFilteredBrands] = useState([]);
    const [showAddButton, setShowAddButton] = useState(false);
    const navigate = useNavigate()

    // Filter brands based on the selected category
    const filterBrandsByCategory = useCallback(
        (category) => {
            if (!category) return allBrands;
            return allBrands.filter((b) => b.category === category);
        },
        [allBrands]
    );

    // Update the filtered brands list when the category changes
    useEffect(() => {
        const categoryBrands = filterBrandsByCategory(category);
        setFilteredBrands(categoryBrands);
        setShowAddButton(false);
    }, [category, filterBrandsByCategory]);

    // Handle search input change and filter brands accordingly
    const handleSearch = (e) => {
        const searchValue = e.target.value;
        setSearchTerm(searchValue);

        const matchingBrands = filterBrandsByCategory(category).filter((b) =>
            b.brandName.toLowerCase().includes(searchValue.toLowerCase())
        );

        setFilteredBrands(matchingBrands);

        // Show "Add Brand" button if no brands match the search
        setShowAddButton(matchingBrands.length === 0 && searchValue !== '');
    };

    // Handle brand selection
    const handleBrandSelection = (selectedBrand) => {
        setBrand(selectedBrand);
        setSearchTerm(''); // Clear the search field after selecting
        setDropdownOpen({ ...dropdownOpen, brand: false }); // Close the dropdown
        setShowAddButton(false); // Hide the "Add Brand" button
    };

    // Handle dropdown toggle
    const handleDropdownToggle = () => {
        toggleDropdown('brand');
    };

    const handleClear = () => {
        setBrand('');
        setSearchTerm('');
        setDropdownOpen({ ...dropdownOpen, brand: false }); // Close the dropdown
        setShowAddButton(false); // Hide the "Add Brand" button
    };

    return (

        <div className="relative w-full">
            <label className="pb-2 text-slate-700 font-medium text-md">Brand</label>
            <div className="relative">
                <input
                    type="text"
                    className="w-full text-slate-500 mt-2 border h-[35px] rounded-[5px] px-2 pr-24"
                    placeholder="Choose or search brand"
                    value={searchTerm || brand}
                    onChange={handleSearch}
                    onClick={handleDropdownToggle} // Open dropdown on click
                />
                {/* Clear button inside the input container */}
                {(searchTerm || brand) && !showAddButton && (
                    <button
                        className="absolute text-xl text-red-500  right-8 top-1/2 transform -translate-y-1/2"
                        onClick={handleClear}
                        aria-label="Clear"
                    >
                        &times; {/* You can use an icon here if preferred */}
                    </button>
                )}
                {/* "Add Brand" button inside the input container */}
                {showAddButton && (
                    <button
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 underline"
                        onClick={() => navigate("/dashboard/brand")}
                    >
                        Add Brand: {searchTerm}
                    </button>
                )}
            </div>

            {/* Dropdown with filtered brands */}
            {dropdownOpen.brand && (
                <div className="absolute w-full mt-2 border rounded-[5px] bg-white z-10 max-h-60 overflow-y-auto">
                    {filteredBrands.length > 0 ? (
                        filteredBrands.map((b) => (
                            <div
                                key={b._id}
                                className="flex items-center gap-2 px-2 py-1 cursor-pointer hover:bg-gray-100 text-gray-600"
                                onClick={() => handleBrandSelection(b.brandName)}
                            >
                                <img src={b?.brandLogo?.url} alt={b.brandName} className="w-6 h-6 rounded-full" />
                                {b.brandName}
                            </div>
                        ))
                    ) : (
                        <div className="px-2 py-1 text-gray-500">No brands available</div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SelectBrand;
