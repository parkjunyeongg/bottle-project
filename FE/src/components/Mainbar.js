import '../../src/css/Mainbar.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const Mainbar =() => {
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
        movePage('/mypage');
    }

    const goManager = () => {
        movePage('/adminlog');
    }

    const handleShowNav = () => {
        if (isFormSize === 47) {
            if (window.innerWidth > 530) {
                setFormSize(150)
            } else {
                setFormSize(100)
            }
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
        if (window.innerWidth >= 1106) {
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
      }, );

    const [isGoImg, setGoImg] = useState(false)
    const [isGoData, setGoData] = useState(false)
    const [isGoManager, setGoManager] = useState(false)

return(
    <>
    <div className="top-bar" style={{height: `${isFormSize}px`}}>
        <p className="logogo" onClick={gohome}>Bottle-project</p>
        <div className="barmenu1">
            <button className={isGoImg === true ? 'barActive' : ''} onClick={goImg}> 이미지 업로드 </button>
            <button className={isGoData === true ? 'barActive' : ''} onClick={goData}> 전체 이미지 인식 내역 </button>
            {/*<button onClick={goMy}> 나의 내역 </button>*/}
            <button className={isGoManager === true ? 'barActive' : ''} onClick={goManager}> 관리자 </button>
        </div>
        <div className={`hidenav ${showNav ? 'visible' : 'hidden'}`} style={{ opacity :`${isSignOpacity}`}}>
            <button onClick={goImg}> 이미지 업로드</button>
            <button onClick={goData}> 전체 이미지 인식 내역 </button>
            {/*<button onClick={goMy}> 나의 내역 </button>*/}
            <button onClick={goManager}> 관리자 </button>
        </div>
        <div className="barmenu2">
            <button onClick={goLogin}> <img alt="loginimg" src="/img/login3030.png" /> </button>
        
        <button className="toggle-button" onClick={handleShowNav}>
            <img alt="loginimg" src="/img/menu3030.png" />
          </button>
        </div>
    </div>
    
    
   
    </>
    );
}
            
export default Mainbar;