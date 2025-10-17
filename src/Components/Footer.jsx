import React from 'react'
import {assets} from '../assets/assets';
import Image from "next/image";
const Footer = () => {
  return (
    <div className='flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-5 items-center'>
        <p className='text-3xl sm:text-4xl font-medium italic text-white'>Tech Info</p>
        <div className='flex flex-col items-center'>
          <p className='text-sm text-white'>All right reserved. Copyright @Tech Info</p> 
          <p className='text-sm text-white'>aditkumar5548@gmail.com</p>
        </div>
        <div className="flex">
          <Image src={assets.facebook_icon} alt='' width={40}/>
          <Image src={assets.googleplus_icon} alt='' width={40}/>
          <Image src={assets.twitter_icon} alt='' width={40}/>
        </div>
    </div>
  )
}

export default Footer
