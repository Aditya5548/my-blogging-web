import { ToastContainer } from 'react-toastify';
import axios from 'axios';

import Navbar from "../Components/Navbar";
import Footer from '../Components/Footer';
import Bloglist from '../Components/Bloglist';
export default function Home(props) {
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
    const res = await axios.get("https://blogging-website-0csb.onrender.com/api/blog");
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
