import { useState ,useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import Adminlogin from './Components/Adminlogin.jsx';
import DashBoard from './Components/DashBoard.jsx';
import Waiting from './Components/Waiting.jsx';
import Inactivitylogout from './Components/Inactivitylogout.jsx'
import axios from 'axios';

const index = () => {
  const [token, setToken] = useState(null);
  const [savedToken, setSavedToken] = useState(Cookies.get("token") || null);
  Inactivitylogout(1*60*1000)

  async function sessionmanage(savedToken) {
      try {
      const decoded = jwtDecode(savedToken);
      const response = await axios.get('/api/sessionmanage', { params: decoded.data});
      if(response.data.success){
        setToken(true);
      }
      else{
        setToken(false);
        Cookies.remove('token') 
      }
      
    } 
  catch (error) {
      setToken(false);
      Cookies.remove('token');
      console.log(error);
  }
}
  useEffect(() => {
    if (savedToken) {
      sessionmanage(savedToken)
    } 
    else{
      setToken(false)
    }
  },[savedToken]);

  return (
    <>
    <ToastContainer/>
    {token==true ?<DashBoard/>:token==false?<Adminlogin/>:<Waiting/>}
    </>
  )
}

export default index
