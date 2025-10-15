import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

import Image from 'next/image';
import { assets } from '../assets/assets';

const Bloglist = (data) => {
  const [menu, setMenu] = useState("All");
  const [blogs] = useState(data.Blogs.blogs);

  const router = useRouter()

  function handleClick(response) {
    router.push({
      pathname: `/blogs/${response._id}`,
      query: response
    })
  }
  return (
    <div>
      <div className="flex justify-center gap-6 my-5">
        <button onClick={() => setMenu('All')} className={menu == "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>All</button>
        <button onClick={() => setMenu('Technology')} className={menu == "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Technology</button>
        <button onClick={() => setMenu('StartUp')} className={menu == "Startup" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Startup</button>
        <button onClick={() => setMenu('LifeStyle')} className={menu == "LifeStyle" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>LifeStyle</button>
      </div>
      <div className="flex flex-wrap justify-center gap-10 mb-16 xl:mx-24">
        {blogs.filter((item) => menu == "All" ? true : item.category === menu).map((item) => (
          <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-gray-500 rounded-md shadow-md hover:shadow-[-7px_7px_0px_#00000]' key={item._id}>
            <p onClick={() => { handleClick(item) }}>
              <Image src={item.image} alt='' width={330} height={100} className='border-b border-gray-500 h-[150px] rounded-t-md' />
            </p>
            <p className='ml-5 mt-5 px-5 py-1 inline-block bg-black text-white text-sm'>{item.category}</p>
            <div className="p-5">
              <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{item.title}</h5>
              <p className="mb-3 text-sm tracking-tight text-gray-700" dangerouslySetInnerHTML={{ __html: item.description.slice(0, 100) }}></p>
              <div className='inline-flex items-center py-2 font-semibold text-center'>
                <p onClick={() => { handleClick(item) }} className="flex px-3 py-1 cursor-pointer">Read more <Image src={assets.arrow} width={15} height={3} className='ml-2' alt='' /></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};


export default Bloglist
