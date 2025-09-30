import { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import {assets} from '../../../assets/assets';
import { toast } from 'react-toastify';

const page = () => {
  const [image,setImage] = useState(false);
  const [data,setData] = useState({
    title:"",
    description:"",
    category:"StartUp",
    author:"Aditya Kumar Yadav",
    authorImg: "/profile_icon.png"
  })
  const onChangeHandler = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setData(data=>({...data,[name]:value}))
    console.log(data)
  }

  const onsubmitHandler = async (e) =>{
    e.preventDefault(); // this is used for avoiding refreshing the page after the summit button click
    const formdata = new FormData();
    formdata.append('title',data.title)
    formdata.append('description',data.description)
    formdata.append('category',data.category)
    formdata.append('author',data.author)
    formdata.append('authorImg',data.authorImg)
    formdata.append('image',image) 
    const response = await axios.post('/api/blog',formdata)

    console.log(response)
    if(response.data.status == "success"){
      toast.success('Blog Added Successfully')
      setImage(false)
      setData({
    title:"",
    description:"",
    category:"StartUp",
    author:"Aditya Kumar Yadav",
    authorImg: "/profile_icon.png"
  })    
    }
    else{
      toast.error('All Fields Are  Required')
    }
  }


  return (
    <>
    <form onSubmit={onsubmitHandler} className="flex flex-col pt-5 px-5 sm:pt-12 sm:pl-16">
      <div className='flex flex-col items-center py-2 border w-full sm:w-[500px] '>
      <p>Upload Thumbnail</p>
      <label htmlFor="image">
        <Image  className='mt-1 cursor-pointer' src={!image?assets.upload_area:URL.createObjectURL(image)} alt='' width={140} height={70}/>
      </label>
      <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden/>
      </div>
      <input className="w-full sm:w-[500px] mt-2 px-4 py-3 border" name='title' onChange={onChangeHandler} value={data.title} type="text"  placeholder='Blog Title' required/>
      <textarea className="w-full sm:w-[500px] mt-2 px-4 py-3 border" type="text" name='description' onChange={onChangeHandler} value={data.description} placeholder='Blog Description' required/>
      <select name="category" onChange={onChangeHandler} value={data.category} className='w-full sm:w-[500px] mt-2 px-4 py-2 border text-grey-500'> 
        <option value="Startup">StartUp</option>
        <option value="Technology">Technology</option>
        <option value="LifeStyle">LifeStyle</option>
      </select>
      <button type='submit' className='mt-4 px-10 py-2 bg-black text-white cursor-pointer'>ADD</button>
    </form>
    </>
  )
}

export default page
