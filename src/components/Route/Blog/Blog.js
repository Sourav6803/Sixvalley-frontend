import React from 'react'
import styles from "../../../styles/styles";
import BlogCard from '../BlogCard/BlogCard';

const Blog = () => {
  return (
    <div className="mt-3 pb-1 bg-slate-600 "  >
      <div className={`${styles.section} `} >
        <div className={`${styles.heading}`}>
          <h1 className="text-white">Blog</h1>
        </div>
        <div className=" border-gray-800 grid grid-cols-2 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px]  border-0 "  >
          <BlogCard />
          <BlogCard />
          <BlogCard />
          <BlogCard />
        </div>
      </div>
    </div>
  )
}

export default Blog