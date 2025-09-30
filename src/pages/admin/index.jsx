import Link from "next/link";
import {assets} from '../../assets/assets';
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

import AddProduct from './addProduct/index';
import Bloglist from './bloglist/index';
import Subscriptions from './subscriptions/index';
import { useState } from "react";
const index = () => {
  const [category,SetCategory] = useState('add');
  const changeStatus = (status)=>{
    SetCategory(status)
  }

  return (
    <>
    <div  className='flex flex-col w-full h-[100vh]'>
      <div className="flex justify-between px-5 py-2 items-center bg-white border-b">
        <Image src={assets.logo} width={150} height={70}/>
        <p className="text-xl font-bold">Admin Panel</p>
      </div>
      
      <div className="flex">
      <div className="flex flex-col pt-10 items-end gap-3 w-[20%] h-[100vh] border-r">
        <button onClick={()=>changeStatus('add')} className="flex items-center border px-5 py-3  gap-2 text-center font-medium shadow-[-7px_7px_0px_#000000]"> <Image src={assets.add_icon} /> <p className="hidden w-[100px] md:block">Add Blogs</p></button>
        <button onClick={()=>changeStatus('blogs')} href={'/admin/bloglist'} className="flex items-center border px-5 py-3  gap-2 text-center font-medium shadow-[-7px_7px_0px_#000000]"> <Image src={assets.blog_icon} /> <p className="hidden w-[100px] md:block">View Blogs       </p></button>
        <button onClick={()=>changeStatus('Subs')} href={'/admin/subscriptions'} className="flex items-center border px-5 py-3  gap-2 text-center font-medium shadow-[-7px_7px_0px_#000000]"> <Image src={assets.email_icon} /> <p className="hidden w-[100px] md:block">Subscription</p></button>
      </div>
      <ToastContainer/>
      <div className="flex justify-center w-full">{category==='add'?<AddProduct/>:category==='blogs'?<Bloglist/>:<Subscriptions/>}</div>
    </div>
    </div>
    </>
  )
}
export default index
