import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Mainbar from './components/Mainbar';
import Imgupload from './components/Imgupload';

function App () {
 
  return (
    <>
    <Mainbar />
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Imgupload" element={<Imgupload />}></Route>
      </Routes>
    </BrowserRouter>
    </>
   
  );
}
 
export default App;
