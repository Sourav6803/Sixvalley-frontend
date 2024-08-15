import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = () => {
    return (
        <div>
            <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <Link to="#">
                    <img className="rounded-t-lg" src="https://sourav-ekart.s3.ap-south-1.amazonaws.com/abc/IMG-20231017-WA0000%5B1%5D.jpg" alt="" />
                </Link>
                <div className="p-2">
                    <Link to="#">
                        <h5 className="mb-1 text-[12px] font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                    </Link>
                    <p className="mb-1 font-normal  text-gray-700 dark:text-gray-400 text-[12px]">Here are the biggest enterprise technology acquisitions of 2021 so far.</p>
                    <Link to="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Read more
                        <svg className="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default BlogCard