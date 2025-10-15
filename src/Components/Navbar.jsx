import {assets} from '../assets/assets';
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
const Navbar = () => {
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

  return (
    <div className='py-5 px-5 md:px-12 lg:px-28'>
        <div className='flex justify-between items-center'>
            <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto'/>
            <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-3 border border-solid border-black shadow-[-7px_7px_0px_#000000] text-black bg-white'>
                Get Started
                <Image src={assets.arrow} alt=''/>
            </button>
        </div>
        <div className='text-center my-8'>
            <h1 className='text-3xl sm:text-5xl font-medium'>Latest Blogs</h1>
            <p className='mt-10 max-w-[740px] m-auto text-xs sm:text-base'>Aditya Kumar Yadav’s blog is a dynamic online space where knowledge, creativity, and personal insights converge. Designed for readers who seek meaningful content, the blog covers a wide range of topics including technology, education, lifestyle, travel, and personal growth.</p>
            <form className='flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black' onSubmit={onSubmitHandler}>
                <input type="email" placeholder='Enter your Email' className='w-full pl-4 outline-none' onChange={(e)=>setEmail(e.target.value)} name="email" value={email}/>
                <button type="submit" className='border-l border-black p-4 sm:px-8 active:bg-gray-600 text-white bg-black'>Subscribe</button>
            </form>
        </div>
    </div>
  )
}

export default Navbar
