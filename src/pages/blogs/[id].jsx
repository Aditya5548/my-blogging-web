import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { assets} from '../../assets/assets';
import Footer from '../../Components/Footer';
import Navbar from '../../Components/Navbar';
const page = ( ) => {
  const router = useRouter();
  const data = router.query;
  return (
    data ? <>
      <div className='bg-gray-300 pb-5'>
        <Navbar/>
        <div className="text-center mb-20 mt-5">
          <h1 className="text-xl sm:text-2xl font-semibold max-w-[700px] mx-auto">{data.title}</h1>
          <Image src={null || data.authorImg} width={60} height={60} alt='' className='mx-auto mt-6 mb-3 border border-white rounded-full' />
          <p className='mt-1 pb-1 text-lg max-w-[740px] mx-auto'>{data.author}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
        <Image src={null || data.image} width={400} height={300} alt='' className='border-4 border-white' />
        <div className='self-start text-justify'>
          <h1 className='my-4 text-[26px] font-semibold'>Introduction</h1>
          <p>{data.description}</p>
          <div className="flex flex-col items-center">
            <p className='text-black font-semibold my-2'>Share this article on social Media</p>
            <div className='flex'>
              <Image src={assets.facebook_icon} width={50} alt='' />
              <Image src={assets.twitter_icon} width={50} alt='' />
              <Image src={assets.googleplus_icon} width={50} alt='' />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </> : <>
      <div className='flex p-5 text-5xl justify-center'>
        <h1 className='self-center'>No Blog Are Available</h1>
      </div>

    </>

  )
}

export default page
