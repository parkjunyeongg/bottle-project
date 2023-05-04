import '../../src/css/Login.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

//로컬 "proxy": "http://10.125.121.221:8080",
//서버 "proxy":"http://kshnx2.iptime.org:8080",

const Login = () => {
    const movePage = useNavigate();  //router
    
    const [isInfo, setInfo] = useState(false); // 회원가입 버튼 누름 확인 state
    const [isFormSize, setFormSize] =useState(350); //로그인 form 크기 state

    const [isLoginOpacity, setLoginOpacity] = useState(1); //표시 설정
    const [isSignOpacity, setSignOpacity] = useState(0);
    const [isLoginDisplay, setLoginDisplay] = useState("block");
    const [isSignDisplay, setSignDisplay] = useState("none");

    const [idError,setIdError] = useState(false)    // id,pw미입력 확인 state
    const [pwError,setPwError] = useState(false)

    const [loginData, setLoginData] = useState({  //로그인 정보 state
        id : '',
        pw :'',
    })

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

    const handleLoginSubmit = (e) => {           // 로그인-------------------------------------
        e.preventDefault();
        const { id, pw } = loginData;
        if (!id){
                setPwError(false)
                setFormSize(400)
                setIdError(true)
        } else if (!pw) {
                setIdError(false)
                setFormSize(400)
                setPwError(true)
        } else {
            /*alert('가입이 완료되었습니다.')

              fetch("/insertMember", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;"
                },
                body: JSON.stringify(signUpData)
                })
                
                .then((signUpData) => {
                console.log('성공:', signUpData);
                })
                .catch((error) => {
                console.error('실패:', error);
                });*/
            movePage('/imgupload');
        }
      };

    const [signUpData, setSingUpData] = useState({  //회원가입 정보 state
        name: '',
        email: '',
        newid : '',
        newpw : '',
    })

    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSingUpData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSignUpSubmit = (e) => {           //회원가입-----------------------------------------
        e.preventDefault();
        const { name, email, newid, newpw } = signUpData;

        if (!name || !email || !newid || !newpw) {
            alert('모든 정보를 입력해 주세요.');
        } else {
              fetch("/insertMember", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;"
                },
                body: JSON.stringify(signUpData)
                })
                .then((signUpData) => {
                    alert('가입이 완료되었습니다.')
                    console.log('성공:', signUpData)
                    setSignOpacity(0)
                    setTimeout(() => {
                        setInfo(false);
                        setSignDisplay("none")
                    }, 350);
                    setTimeout(() => {
                        setLoginDisplay("block")
                        setFormSize(350);
                    },350)
                    setTimeout(() =>{
                        setLoginOpacity(1)
                        //window.location.reload()
                    },500)
                
                })
                .catch((error) => {
                    console.error('실패:', error)
                    alert("중복된 아이디입니다.")
                });
                
                
        }
      };


    const startSignUp = (e) => { //회원가입 버튼 누를시 
        e.preventDefault();
        setLoginOpacity(0)
        setIdError(false)
        setPwError(false)
        setFormSize(500); //회원가입 버튼 누르면 sign의 form크기 확장
        setTimeout(() => {                  // 애니메이션
            setInfo(true);                  
            setLoginDisplay("none")         
        }, 350);
        setTimeout(() => {
            setSignDisplay("block")
        },350)
        setTimeout(() =>{
            setSignOpacity(1)
        },500)                              // 애니메이션
        
    }

    const endSignUp = (e) => { //회원가입 취소 버튼 누를시
        e.preventDefault();
        setSignOpacity(0)
        setTimeout(() => {
            setInfo(false);
            setSignDisplay("none")
        }, 350);
        setTimeout(() => {
            setLoginDisplay("block")
            setFormSize(350);
        },350)
        setTimeout(() =>{
            setLoginOpacity(1)
        },500)  
    }

return(
    <>
        <form className = "sign" style={{height: `${isFormSize}px`}}>
            <div className={`newidpwd ${isInfo ? 'visible' : 'hidden'}`} style={{ opacity :`${isSignOpacity}`, display : `${isSignDisplay}`}} >

                {isInfo && (<h3>Sign Up</h3>)}

                <div className="name">
                    <label htmlFor="name"> Name </label>
                    <input type="text" name="name" id = "name" value={signUpData.name} onChange={handleSignUpChange} placeholder="Enter Name"/> 
                
                </div>
                <div className="email">
                    <label htmlFor="email"> Email </label>
                    <input type="text" name="email" id = "email" value={signUpData.email} onChange={handleSignUpChange} placeholder="Enter Email"/>

                </div>
                <div className="id">
                    <label htmlFor="newid"> ID </label>
                    <input type="text" name="newid" id = "newid" value={signUpData.newid} onChange={handleSignUpChange} placeholder="Enter new ID"/> 
                    
                </div>
                <div className="pwd">
                    <label htmlFor="newpw"> Password </label>
                    <input type="password" name="newpw" id = "newpw" value={signUpData.newpw} onChange={handleSignUpChange} placeholder="Enter new password"/>

                </div>
                
                <div className="but">
                    {isInfo && (<button type="submit" onClick={handleSignUpSubmit}> 가입 </button>)}
                </div>
                <div className="signup">
                    {isInfo && (<button onClick={endSignUp} > 취소 </button>)}
                </div>
            </div> 

            <div className={`idpwd ${!isInfo ? 'visible' : 'hidden'}`} style={{ opacity :`${isLoginOpacity}`, display : `${isLoginDisplay}` }}>

                {!isInfo && (<h3>Sign In</h3>)}

                <div className="id">
                    <label htmlFor="input_id"> ID </label>
                    <input type="text" name = "id" id = "input_id" value={loginData.id} onChange={handleLoginChange} placeholder="Enter ID"/> 
                    
                </div>
                <div className="pwd">
                    <label htmlFor="input_pw"> Password </label>
                    <input type="password" name = "pw" id = "input_pw" value={loginData.pw} onChange={handleLoginChange} placeholder="Enter password"/>

                </div>
                <div className="errorbox">
                    {idError && (<p>아이디를 입력해 주세요.</p>)}
                    {pwError && (<p>비밀번호를 입력해 주세요.</p>)}
                </div>
                <div className="but">
                    {!isInfo && (<button type="submit" id = "sub" onClick={handleLoginSubmit}> 로그인 </button> )}
                </div>
                <div className="signup">
                    {!isInfo && (<button id = "sgup" onClick={startSignUp} > 회원가입 </button>)}
                </div>
            </div>
        </form>
    </>
    );
}

export default Login ;