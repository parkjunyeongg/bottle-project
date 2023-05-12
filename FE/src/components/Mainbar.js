import '../../src/css/Mainbar.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const Mainbar =(props) => {
    const [showNav, setShowNav] = useState(false);
    const movePage = useNavigate();

    const gohome= () => {
        movePage('');
    }
    const goImg = () =>  {
        movePage('/imgupload');
    }

    const goLogin = () =>  {
        movePage('/login');
    }

    const goData = () => {
        movePage('/database');
    }
    
    const goMy = () => {
        movePage('/mypage')
    }

    const handleShowNav = () => {
        setShowNav(!showNav);
      };

    const { isLogin } = props;

return(
    <>
    <div className="top-bar">
        <p className="logogo" onClick={gohome}>Bottle-project</p>
        <div className="barmenu1">
            <button onClick={goImg}> img upload</button>
            <button onClick={goData}> database </button>
            <button onClick={goMy}> Mypage </button>
        </div>
        <div className="barmenu2">
            <button onClick={goLogin}> Login </button>
        </div>
        <button className="toggle-button" onClick={handleShowNav}>
            Navigation
          </button>
    </div>
    {showNav && (<div className="hidenav">
            <button onClick={goImg}> img upload</button>
            <button onClick={goData}> database </button>
            <button onClick={goMy}> Mypage </button>
        </div>)}
   
    </>
    );
}
            
export default Mainbar;