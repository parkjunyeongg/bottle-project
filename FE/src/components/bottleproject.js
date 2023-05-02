import '../../src/css/Imgupload.css';
import Mainbar from './Mainbar';
import Login from './Login';
import Imgupload from './Imgupload';
import { Routes, Route } from 'react-router-dom';
import Database from './Database';

const bottleproject = () => {

return(
    <>
    <Mainbar />
    <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/imgupload" element={<Imgupload />}></Route>
        <Route path="/database" element={<Database />}></Route>
    </Routes>

    </>
    );
}
            
export default bottleproject;