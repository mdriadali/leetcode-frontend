import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch, useSelector } from "react-redux";
import { checkUser } from "./context/authSlice";
import ProblemCreate from "./components/ProblemCreate";
import ProblemPage from "./pages/ProblemPage";
import Admin from "./pages/Admin";
import ProblemDelete from "./components/Problemdelete";
import VideoDelete from "./components/VideoControl";
import VideoControl from "./components/VideoControl";
import VideoUpload from "./components/VideoUpload";

const App = () => {
  const {isAuthenticated, loading , user} = useSelector((state) => state?.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUser()); 
  }, [dispatch]);

  if(loading){
    return(
      <div className="flex justify-center items-center h-screen ">
     <div className="loading loading-bars loading-xl"></div>
     </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage></HomePage> :<Navigate to='/login'/>}></Route>
        <Route path="/login" element={isAuthenticated ? <Navigate to='/'/> :<Login></Login>}></Route>
        <Route path="/signup" element={isAuthenticated ? <Navigate to='/'/> :<Signup></Signup>}></Route>
        <Route path="/admin" element={isAuthenticated &&user?.role==='admin'? <Admin/>:<Navigate to='/login'/>}></Route>
        <Route path="/admin/problem/create" element={isAuthenticated &&user?.role==='admin' ? <ProblemCreate/>:<Navigate to='/login'/>}></Route>
        <Route path="/admin/problem/delete" element={isAuthenticated &&user?.role==='admin' ? <ProblemDelete/>:<Navigate to='/login'/>}></Route>
        <Route path="/admin/problem/videoControl" element={isAuthenticated &&user?.role==='admin' ? <VideoControl/>:<Navigate to='/login'/>}></Route>
        <Route path="/admin/problem/videoUpload/:problemId" element={isAuthenticated &&user?.role==='admin' ? <VideoUpload/>:<Navigate to='/login'/>}></Route>
        <Route path="problem/getProblem/:id" element={isAuthenticated ? <ProblemPage/>:<Navigate to='/login'/>}></Route>
      </Routes>
    </>
  );
};

export default App;
