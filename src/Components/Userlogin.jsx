import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { ToastContainer } from 'react-toastify';
import { useRouter } from "next/router";
import { useUser } from "@/context/UserContext";
import { assets } from "@/assets/assets";
import { signIn} from "next-auth/react";
const Userlogin = () => {
  const [email,SetEmail] = useState();
  const [password,SetPassword] = useState();
  const {showhide , setShowhide} = useUser();
  const {showhideoptions, setShowhideoptions} = useUser();
  const {username, setUsername} = useUser();
  const data ={email,password}
  const router = useRouter()
  const logcode = async(e)=>{
    e.preventDefault();
    var response =await axios.get('/api/user',{params:data})
    if(response.data.success==true){
      SetEmail("")
      SetPassword("")
      localStorage.setItem("usertoken",response.data.usertoken)
      setUsername(response.data.username)
      setShowhide(false)
    }
    else{
      toast.error(response.data.msg)
    }
  }
  return (
    <>
    <div className='fixed top-0 left-0 z-5 flex justify-center items-center w-screen h-screen bg-gray-100/90'>
      <ToastContainer/>
      <div className='flex flex-col gap-2 w-[90%] md:w-[400px] border border-gray-400 shadow-lg px-10 py-3 bg-white'>
          <div className='flex items-center py-2'>
            <h1 className="text-2xl text-center font-bold w-9/10">Login</h1>
            <button  className="text-2xl w-1/10" onClick={()=>setShowhide(false)}>X</button> 
          </div>
         <div className="pt-3">
          <h1 className="flex">Don't have an account ?<button className="text-blue-600 px-0.5 italic" onClick={()=>{setShowhideoptions(2)}}>SignUp</button></h1>
         </div>
         <form className='flex flex-col gap-5 pt-3' onSubmit={logcode}>
          <input type="email" placeholder='email Id' className='w-full outline-none border border-gray-200 px-3 py-1' name="email" value={email} onChange={(e)=>{SetEmail(e.target.value)}} required />
          <input type="password" placeholder='Password' className='w-full outline-none border border-gray-200 px-3 py-1' name="password" value={password} onChange={(e)=>{SetPassword(e.target.value)}} required />
          <button className="bg-black text-white py-2 cursor-pointer">Submit</button>
         </form>
         <div className="flex justify-end"><u className="text-blue-600 mr-2 text-lg">Forgot password</u></div>
          <div className="flex flex-col items-center gap-2">
            <h1>Login with </h1>
            <Image src={assets.google_icon} width={50} height={50} className="cursor-pointer" onClick={()=>signIn('google')} alt="no image not"/>
          </div>
      </div>
    </div>
    </>
  )
}

export default Userlogin
