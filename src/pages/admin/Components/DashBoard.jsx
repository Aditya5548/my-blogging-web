import { useEffect, useState } from "react";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

import AddProduct from './AddProduct';
import Bloglist from './Bloglist';
import Subscriptions from './Subscriptions';
import {assets} from '../../../assets/assets';

const DashBoard = () => {
  const [category,SetCategory] = useState('add');
  const changeStatus = (status)=>{
    SetCategory(status)
  }
  const logout =()=>{
    localStorage.removeItem('token')
    window.location.reload()
  }
  return (
    <>
    <div  className='flex flex-col w-full h-[100vh]'>
      <div className="flex justify-between px-5 py-2 items-center bg-white border-b">
        <Image src={assets.logo} width={150} height={70}/>
        <p className="text-xl font-bold cursor-pointer" onClick={logout}>Admin Panel</p>
      </div>
      
      <div className="flex">
      <div className="flex flex-col pt-10 items-end gap-3 w-[20%] h-[100vh] border-r">
        <button onClick={()=>changeStatus('add')} className="flex items-center border px-5 py-3  gap-2 text-center font-medium shadow-[-7px_7px_0px_#000000]"> <Image src={assets.add_icon}  alt=''/> <p className="hidden w-[100px] md:block">Add Blogs</p></button>
        <button onClick={()=>changeStatus('blogs')} href={'/admin/bloglist'} className="flex items-center border px-5 py-3  gap-2 text-center font-medium shadow-[-7px_7px_0px_#000000]"> <Image src={assets.blog_icon}  alt=''/> <p className="hidden w-[100px] md:block">View Blogs       </p></button>
        <button onClick={()=>changeStatus('Subs')} href={'/admin/subscriptions'} className="flex items-center border px-5 py-3  gap-2 text-center font-medium shadow-[-7px_7px_0px_#000000]"> <Image src={assets.email_icon}  alt=''/> <p className="hidden w-[100px] md:block">Subscription</p></button>
        <button onClick={()=>logout()} href={'/admin/subscriptions'} className="flex items-center border px-6 py-3  gap-2 text-center font-medium shadow-[-7px_7px_0px_#000000]"> <Image src={assets.logout} width={30} height={20}  alt=''/> <p className="hidden w-[100px] md:block">Logout</p></button>
      </div>
      <ToastContainer/>
      <div className="flex justify-center w-full">{category==='add'?<AddProduct/>:category==='blogs'?<Bloglist/>:<Subscriptions/>}</div>
    </div>
    </div>
    </>
  )
}
export default DashBoard
