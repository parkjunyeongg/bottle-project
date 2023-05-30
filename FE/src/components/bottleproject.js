import { Routes, Route, useLocation } from 'react-router-dom';
import Mainbar from './Mainbar';
import Login from './Login';
import Imgupload from './Imgupload';
import Database from './Database';
import Admin from './admin';
import Mypage from './Mypage';
import Home from './home';

const Bottleproject = () => {

    const location = useLocation();
    const shouldShowMainbar = location.pathname !== "/login"; // 로그인 페이지가 아닌 경우에만 Mainbar를 보여줌


return(
    <>
    {shouldShowMainbar && <Mainbar />}
    <Routes>
        <Route path="" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/mypage" element={<Mypage />}></Route>
        <Route path="/imgupload" element={<Imgupload />}></Route>
        <Route path="/database" element={<Database />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
    </Routes>

    </>
    );
}
            
export default Bottleproject;