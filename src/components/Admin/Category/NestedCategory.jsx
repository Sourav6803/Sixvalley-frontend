
import React, { useEffect, useState } from "react";

const MultilevelDropdown = ({ categories, path }) => {
  const [selectedPath, setSelectedPath] = useState([]);
  const [currentCategories, setCurrentCategories] = useState([]);

  useEffect(() => {
    if (path && path.length > 0) {
      const updatedCategories = [categories];
      let currentLevelCategories = categories;

      path.forEach((levelName) => {
        const matchedCategory = currentLevelCategories.find(
          (category) => category.name === levelName
        );
        if (matchedCategory) {
          updatedCategories.push(matchedCategory.children || []);
          currentLevelCategories = matchedCategory.children || [];
        }
      });

      setSelectedPath(path);
      setCurrentCategories(updatedCategories);
    } else {
      setCurrentCategories([categories]);
    }
  }, [path, categories]);

  const handleCategorySelect = (category, level) => {
    const updatedPath = selectedPath.slice(0, level);
    updatedPath.push(category.name);
    setSelectedPath(updatedPath);

    const nextLevelCategories = category.children || [];
    const updatedCategories = currentCategories.slice(0, level + 1);
    if (nextLevelCategories.length > 0) {
      updatedCategories.push(nextLevelCategories);
    }
    setCurrentCategories(updatedCategories);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 overflow-x-auto mt-3">
        {currentCategories.map((categories, level) => (
          <div
            key={level}
            className="flex flex-col bg-white shadow rounded-md w-48 p-2 h-auto border border-gray-200"
          >
            <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <div
                  key={category._id}
                  className={`py-1 px-2 rounded-md cursor-pointer text-sm md:text-base text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors ${
                    selectedPath[level] === category.name
                      ? "bg-blue-200 font-semibold"
                      : ""
                  }`}
                  onClick={() => handleCategorySelect(category, level)}
                >
                  {category.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultilevelDropdown;
















