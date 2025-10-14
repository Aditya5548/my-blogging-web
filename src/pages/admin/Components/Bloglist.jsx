import axios from "axios";
import Image from "next/image";
import useSWR from "swr";
import { ClipLoader } from "react-spinners";

import { assets } from '../../../assets/assets';
import { toast } from "react-toastify";
const fetcher = (url) => fetch(url).then(res => res.json())
const Bloglist = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/blog', fetcher)
  if (isLoading) {return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-5">
        <h2 className="text-3xl">Please Wait...</h2>
        <ClipLoader size={50} color="#000000" loading />
      </div>
    </div>)
  }
  if (error) {
    return (
    <div className="flex justify-center items-center">
      <div className="text-2xl">
        <h2>OOPS....</h2>
        <h3>there is a connectivity Issue..</h3>
      </div>
    </div>)
  }

  const deleteBlog = async (blogid) => {
    await axios.delete('/api/blog', { params: { id: blogid } });
    toast.success('Blog Deleted Successfully..');
    mutate();
  }

  console.log(data)
  return (
    <div className="flex flex-col items-center pt-5 px-5 sm:pt-12 sm:pl-16">
      <div className='relative h-[80vh] max-w-[850px] overflow-x-auto border border-gray-400 scrollbar-hide'>
          <div className="hidden md:flex text-sm text-gray-700 text-left uppercase bg-gray-50">
              <p className="w-full md:w-3/20 px-6 py-3">Photo</p>
              <p className="w-full md:w-2/5 px-6 py-3">Blog Title</p>
              <p className="w-full md:w-3/20 px-6 py-3">Date</p>
              <p className="w-full md:w-3/20 px-6 py-3">Time</p>
              <p className="w-full md:w-3/20 px-6 py-3">Action</p>
          </div>
            {data.map((item) => (
              <div key={item._id} className="flex flex-wrap justify-around items-center bg-white border-b">
                <p className="w-full md:w-3/20 gap-3 px-6 py-4 font-medium text-gray-900">
                  <Image src={item.authorImg ? item.authorImg : assets.profile_icon} alt="" width={50} height={50} />
                </p>
                <p className="w-full md:w-2/5 px-6 py-4">{item.title}</p>
                <p className="w-full md:w-3/20 px-6 py-3">{item.date}</p>
                <p className="w-full md:w-3/20 px-6 py-3">{item.date}</p>
                <div className="flex justify-center w-full md:w-3/20">
                  <button className="bg-red-500 w-full text-white px-3 py-2 m-2 cursor-pointer rounded-md" onClick={()=>deleteBlog(item._id)}>Remove</button>
                </div> 
              </div>
            ))}
      </div>
    </div>
  )
}

export default Bloglist
