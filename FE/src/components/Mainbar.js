import '../../src/css/Mainbar.css';
import { useNavigate } from 'react-router-dom';

const Mainbar =() => {
    const movePage = useNavigate();
   
    const goImg = () =>  {
        movePage('/imgupload');
    }

    const goLogin = () =>  {
        movePage('/');
    }

    const goData = () => {
        movePage('/database');
    }


return(
    <>
    <div className="upbar">
        <p className="logogo">Bottle-project</p>
        <div className="barmenu">
            <button onClick={goLogin}> Login </button> 
            <button onClick={goImg}> img upload</button>
            <button onClick={goData}> database </button> 
        </div>
    </div>
    </>
    );
}
            
export default Mainbar;