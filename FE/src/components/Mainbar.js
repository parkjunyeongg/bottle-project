import '../../src/css/Mainbar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Mainbar =(props) => {
    const [isFormSize, setFormSize] =useState(47); //Mainbar form 크기 state

    const [isSignOpacity, setSignOpacity] = useState(0);
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
        if (isFormSize === 47) {
            setFormSize(150)
            setTimeout(() => {
                setShowNav(!showNav);
                setSignOpacity(1)
            }, 150);
            
        } else {
            setShowNav(!showNav);
            setSignOpacity(0)
            setTimeout(() => {
                setFormSize(47)
            }, 300);
        }
        
      };

      const handleResize = () => {
        if (window.innerWidth >= 886) {
            setShowNav(!showNav);
            setSignOpacity(0)
            setTimeout(() => {
                setFormSize(47)
            }, 300);
        }
      };

      useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    const { isLogin } = props;

return(
    <>
      
    <div className="top-bar" style={{height: `${isFormSize}px`}}>
        <p className="logogo" onClick={gohome}>Bottle-project</p>
        <div className="barmenu1">
            <button onClick={goImg}> img upload</button>
            <button onClick={goData}> database </button>
            <button onClick={goMy}> Mypage </button>
        </div>
        <div className={`hidenav ${showNav ? 'visible' : 'hidden'}`} style={{ opacity :`${isSignOpacity}`}}>
            <button onClick={goImg}> img upload</button>
            <button onClick={goData}> database </button>
            <button onClick={goMy}> Mypage </button>
        </div>
        <div className="barmenu2">
            <button onClick={goLogin}> <img alt="loginimg" src="img/login3030.png" /> </button>
        
        <button className="toggle-button" onClick={handleShowNav}>
            <img alt="loginimg" src="img/menu3030.png" />
          </button>
        </div>
    </div>
    <div className="backgroundimg">
    <img alt="loginimg" src="img/ex1.jpg" />
    </div>
    
   
    </>
    );
}
            
export default Mainbar;