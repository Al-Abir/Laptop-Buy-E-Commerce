
import { useState ,useEffect} from "react";
import { useNavigate,useLocation} from "react-router-dom";

const Spinner = () => {
    const [count,setCount] = useState(5)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
           const interval = setInterval(()=>{
               setCount((prevValue)=> --prevValue)
           },1000)
           count==0 && navigate('/login',{
            state:location.pathname
           })
           return ()=>clearInterval();
    },[count,navigate,location])
  return (
    <div className="flex  flex-col justify-center items-center h-screen">
        <h1 className="text-center">redirecting to you in {count}</h1>
      <div className="w-12 h-12 border-4 border-blue-500 border-solid border-t-transparent rounded-full animate-spin mt-5"></div>
    </div>
  );
};

export default Spinner;
