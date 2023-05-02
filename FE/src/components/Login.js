import '../../src/css/Login.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const movePage = useNavigate();
    const gohome = () => {
        movePage('/');
    }
    const goImg = () =>  {
        movePage('/imgupload');
      }

    const [isInfo, setInfo] = useState(false); // 회원가입 버튼 누름 확인
    const [isFormSize, setFormSize] =useState(370); //회원가입 버튼 누름시 창 확장
      
    const [loginData, setLoginData] = useState({
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

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const { id, pw } = loginData;
        if (!id || !pw) {
            alert('모든 정보를 입력해 주세요.');
        } else {
            console.log(loginData)
            goImg()
        }
      };

    const [signUpData, setSingUpData] = useState({
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

      const handleSignUpSubmit = (e) => {
        e.preventDefault();
        const { name, email, newid, newpw } = signUpData;
        if (!name || !email || !newid || !newpw) {
            alert('모든 정보를 입력해 주세요.');
        } else {
            console.log(signUpData)
            alert('가입이 완료되었습니다.(임시)')
            endSignUp()
        }
      };

    
    const [idError,setIdError] = useState(false)
    const [pwError,setPwError] = useState(false)
    

    const startSignUp = () => {
        setInfo(true); //회원가입 버튼을 누르면 true

        if (isFormSize === 370) {
            setFormSize(500); //회원가입 버튼 누르면 sign의 form크기 150 확장
        } else if (isFormSize === 500) {
            setFormSize(370); // 회원가입 취소시 sign의 form크기 150 줄어듬
        }
    }

    const endSignUp = () => {
        setInfo(false)

        if (isFormSize === 500) {
            setFormSize(370); 
        } else if (isFormSize === 370) {
            setFormSize(500); 
        }
    }

return(
    <>
        <form className = "sign" style={{height: `${isFormSize}px`}}>
            {!isInfo && (<h3>Sign In</h3>)}
            {isInfo && (<h3>Sign Up</h3>)}

            {isInfo && (<div className="idpwd">
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
            </div> )}

            {!isInfo && (<div className="idpwd">
                <div className="id">
                    <label htmlFor="input_id"> ID </label>
                    <input type="text" name = "id" id = "input_id" value={loginData.id} onChange={handleLoginChange} placeholder="Enter ID"/> 
                    
                </div>
                <div className="pwd">
                    <label htmlFor="input_pw"> Password </label>
                    <input type="password" name = "pw" id = "input_pw" value={loginData.pw} onChange={handleLoginChange} placeholder="Enter password"/>

                </div>
            </div> )}
            <div className='errorbox'>
                {idError && (<p>아이디를 입력해 주세요.</p>)}
                {pwError && (<p>비밀번호를 입력해 주세요.</p>)}
            </div>
            <div className="but">
                {!isInfo && (<button type="submit" id = "sub" onClick={handleLoginSubmit}> 로그인 </button> )}
                {isInfo && (<button type="submit" onClick={handleSignUpSubmit}> 가입 </button>)}
            </div>

            <div className="signup">
                {!isInfo && (<button id = "sgup" onClick={startSignUp} > 회원가입 </button>
                )}
                {isInfo && (<button onClick={endSignUp} > 취소 </button>
                )}
            </div>
            
        </form>
    </>
    );
}

export default Login ;