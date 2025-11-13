import React, { useState } from 'react';
import { useRouter } from "next/router";
import axios from 'axios';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { assets } from '../assets/assets';

const Bloglist = (data) => {
  const [menu, setMenu] = useState("All");
  const [blogs] = useState(data.Blogs.blogs);
    const [email,setEmail] = useState('');
    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        const response = await  axios.post('/api/email',{email:email});
        if(response.data.success){
            toast.success(response.data.msg);
            setEmail("");
        }
        else{
            toast.error(response.data.msg);
        }
    }

  const router = useRouter()
  function handleClick(response) {
    router.push({
      pathname: `/blogs/${response._id}`,
      query: response
    })
  }
  return (
    <div>
      <div className='text-center my-5 md:my-6'>
        <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
        <p className='mt-5 w-4/5 md:max-w-[740px] m-auto text-xs sm:text-base'>Aditya Kumar Yadav’s blog is a dynamic online space where knowledge, creativity, and personal insights converge. Designed for readers who seek meaningful content, the blog covers a wide range of topics including technology, education, lifestyle, travel, and personal growth.</p>
        <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-5 border border-black' onSubmit={onSubmitHandler}>
          <input type="email" placeholder='Enter your Email' className='w-full pl-4 outline-none' onChange={(e) => setEmail(e.target.value)} name="email" value={email} />
          <button type="submit" className='border-l border-black p-4 sm:px-8 active:bg-gray-600 text-white bg-black'>Subscribe</button>
        </form>
      </div>
      <div className="flex justify-center gap-6 my-5">
        <button onClick={() => setMenu('All')} className={menu == "All" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>All</button>
        <button onClick={() => setMenu('Technology')} className={menu == "Technology" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Technology</button>
        <button onClick={() => setMenu('StartUp')} className={menu == "StartUp" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>Startup</button>
        <button onClick={() => setMenu('LifeStyle')} className={menu == "LifeStyle" ? 'bg-black text-white py-1 px-4 rounded-sm' : ""}>LifeStyle</button>
      </div>
      <div className="flex flex-wrap justify-center gap-10 mb-16 xl:mx-24">
        {blogs.filter((item) => menu == "All" ? true : item.category === menu).map((item) => (
          <div className='max-w-[330px] sm:max-w-[300px] bg-white rounded-md shadow-lg hover:shadow-[-7px_7px_0px_#00000]' key={item._id}>
            <p onClick={() => { handleClick(item) }}>
              <Image src={item.image} alt='' width={330} height={100} className='border-b border-gray-500 h-[150px] rounded-t-md' />
            </p>
            <p className='ml-5 mt-5 px-5 py-1 inline-block bg-black text-white text-sm'>{item.category}</p>
            <div className="p-5">
              <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{item.title}</h5>
              <p className="mb-3 text-sm tracking-tight text-gray-700" dangerouslySetInnerHTML={{ __html: item.description.slice(0, 100) }}></p>
              <div className='inline-flex items-center py-2 font-semibold text-center'>
                <p onClick={() => { handleClick(item) }} className="flex px-3 py-1 cursor-pointer text-black">Read more <Image src={assets.arrow} style={{ width: "15px",height: "auto"}} className='ml-2' alt='' /></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
};


export default Bloglist
