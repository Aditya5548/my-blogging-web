import axios from "axios";
import useSWR from "swr";
import { toast } from "react-toastify";
import { ClipLoader  } from "react-spinners";
const fetcher = (url) => fetch(url).then(res => res.json())
const page = () => {
    const { data, error, isLoading, mutate } = useSWR('/api/email', fetcher)
    if (isLoading) {return (
      <div className="flex justify-center items-center">
        <div  className="flex flex-col items-center text-3xl gap-5">
          <h2>Please Wait...</h2>
           <ClipLoader size={50} color="#000000" loading />
        </div>
      </div>)
    }
    if (error) {
      return (
      <div className="flex justify-center items-center">
        <div className="text-3xl">
          <h2>OOPS....</h2>
          <h3>there is a connectivity Issue..</h3>
        </div>
      </div>)
    }
  
  const deleteBlog = async (blogid) => {
    await axios.delete('/api/email', { params: { id: blogid } });
    toast.success('Subscription Deleted');
    mutate();
  }

  return (
    <div className='flex flex-col items-center pt-5 px-5 sm:pt-12 sm:pl-16 w-full'>
      <div className="relative h-[80vh] overflow-x-auto mt-4 border border-gray-400 w-4/5">
          <div className='hidden md:flex md:justify-between text-l text-left text-white uppercase bg-black'>
              <p className="w-full md:w-2/5 px-5 py-2">Email</p>
              <p className="w-full md:w-1/5 px-5 py-2">Date</p>
              <p className="w-full md:w-1/5 px-5 py-2">Time</p>
              <p className="w-full md:w-1/5 px-5 py-2 text-center">Action</p>
          </div>
            {data.map((item) => (
              <div key={item._id} className="flex flex-wrap justify-between items-center bg-white border-b">
                <p className="w-full md:w-2/5 px-3 py-2">{item.email}</p>
                <p className="w-full md:w-1/5 px-3 py-2">{item.date}</p>
                <p className="w-full md:w-1/5 px-3 py-2">{item.time}</p>
                <div className="flex justify-center w-full md:w-1/5">
                  <button className="bg-red-500 text-white px-3 py-2 m-2 cursor-pointer w-full rounded-md" onClick={()=>deleteBlog(item._id)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
  )
}

export default page
