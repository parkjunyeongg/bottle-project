import '../../src/css/Imgupload.css';
import Mainbar from './Mainbar';
import Login from './Login';
import Imgupload from './Imgupload';
import { Routes, Route } from 'react-router-dom';

const bottleproject = () => {

return(
    <>
    <Mainbar />
    <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/imgupload" element={<Imgupload />}></Route>
    </Routes>

    </>
    );
}
            
export default bottleproject;