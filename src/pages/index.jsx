import axios from 'axios';
import { useEffect, useState } from 'react';
import { ClipLoader } from "react-spinners"
import { ToastContainer } from 'react-toastify';
import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import Bloglist from '../Components/Bloglist';

export default function Home(props) {
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])
  if(loading) return(
  <div className='flex flex-col items-center justify-center w-full h-screen gap-3'>
    <i className='text-3xl md:text-5xl'>Tech Info</i>
    <ClipLoader size={50} color="#000000" loading /> 
  </div>
);
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Bloglist Blogs={props}/>
    <Footer/>
    </>
  );
}

export const getServerSideProps = async () => {
  try {
    const res = await axios.get("https://my-blogging-web.onrender.com/api/blog",{ params: {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkFkaXR5YTkzNzciLCJpYXQiOjE3NjA1MzM0NzN9.CqdnBoA0eNMwLa7U8dWtDhuw7QLa3tsgbL8Q8hxSvAo"}});
    return {
      props: {blogs:res.data},
    };
  } catch (error) {
    console.error("Error fetching blogs:", error.message);
    return {
      props: { blogs: [] },
    };
  }
};
