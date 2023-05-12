import { Routes, Route } from 'react-router-dom';
import Mainbar from './Mainbar';
import Login from './Login';
import Imgupload from './Imgupload';
import Database from './Database';
import Admin from './admin';
import Mypage from './Mypage';





const bottleproject = () => {

return(
    <>
    
    <Routes>
        <Route path="" element={<Mainbar />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/imgupload" element={<Imgupload />}></Route>
        <Route path="/database" element={<Database />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
    </Routes>

    </>
    );
}
            
export default bottleproject;