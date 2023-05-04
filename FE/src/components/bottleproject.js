import '../../src/css/Imgupload.css';
import { Routes, Route } from 'react-router-dom';
import Mainbar from './Mainbar';
import Login from './Login';
import Imgupload from './Imgupload';
import Database from './Database';
import Admin from './admin';




const bottleproject = () => {

return(
    <>
    <Mainbar />
    <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/imgupload" element={<Imgupload />}></Route>
        <Route path="/database" element={<Database />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
    </Routes>

    </>
    );
}
            
export default bottleproject;