import { useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
const Adminlogin = () => {
  const [userid,SetUserid] = useState();
  const [password,SetPassword] = useState();
  const [msg,SetMsg] =useState();
  const data ={userid,password}
  const logcode = async(e)=>{
    e.preventDefault();
    var response =await axios.get('/api/admin',{params:data})
    if(response.data.success==true){
      SetUserid("")
      SetPassword("")
      Cookies.set("token", response.data.authkey, { expires: 7 });
      window.location.reload()  //refresh the current route
    }
    else{
      SetMsg(response.data.msg)
    }
  }
  return (
    <>
    <div className=' flex justify-center items-center w-screen h-screen'>
      <div className='flex flex-col gap-2 w-[90%] md:w-[400px] h-[280px] border border-gray-400 shadow-lg px-10 py-5'>
         <i className='text-xl text-center font-bold'>Admin Login</i> 
         <form className='flex flex-col gap-5 pt-3' onSubmit={logcode}>
          <input type="text" placeholder='User Id' className='w-full outline-none border border-gray-200 px-3 py-1' name="userid" value={userid} onChange={(e)=>{SetUserid(e.target.value)}}/>
          <input type="text" placeholder='Password' className='w-full outline-none border border-gray-200 px-3 py-1' name="password" value={password} onChange={(e)=>{SetPassword(e.target.value)}}/>
          <button className="bg-black text-white py-2 cursor-pointer">Submit</button>
         </form>
         <p className="text-red-600 text-sm pt-2">{msg}</p>
      </div>
    </div>
    </>
  )
}

export default Adminlogin
