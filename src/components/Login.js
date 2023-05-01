import '../../src/css/Login.css';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const movePage = useNavigate();
   
    const goImg = () =>  {
        movePage('/imgupload');
      }

    const [isInfo, setInfo] = useState(false); // 회원가입 버튼 누름 확인
    const [isFormSize, setFormSize] =useState(370); //회원가입 버튼 누름시 창 확장

    const [inputId, setInputId] = useState('')
    const [inputPw, setInputPw] = useState('')

    const [newName, setNewName] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newId, setNewId] = useState('')
    const [newPw, setNewPw] = useState('')
    
    const [idError,setIdError] = useState(false)
    const [pwError,setPwError] = useState(false)

    const handleInputId = (e) => {
        setInputId(e.target.value)
    }
 
    const handleInputPw = (e) => {
        setInputPw(e.target.value)
    }

    const handleNewName = (e) => {
        setNewName(e.target.value)
    }
    const handleNewEmail = (e) => {
        setNewEmail(e.target.value)
    }
    const handleNewId = (e) => {
        setNewId(e.target.value)
    }
    const handleNewPw = (e) => {
        setNewPw(e.target.value)
    }

    const startSignUp = () => {
        setInfo(true); //회원가입 버튼을 누르면 true

        if (isFormSize === 370) {
            setFormSize(500); //회원가입 버튼 누르면 sign의 form크기 150 확장
        } else if (isFormSize === 500) {
            setFormSize(350); // 회원가입 취소시 sign의 form크기 150 줄어듬
        }
    }

    const onClickLogin = () => {

        const logininfomation = [{
            ID:inputId,
            Passward:inputPw
        }];
        
        if (inputId === ""){
            //setIdError(true)
            alert("아이디를 입력해 주세요.")
        }
        else if (inputPw === ""){
            //setPwError(true)
            alert("비밀번호를 입력해 주세요.")
        } else {
            console.log(logininfomation)
            goImg()
        }
        
    }

    const onClickSignup =() => {

        const signupinfomation = [{
            Name:newName,
            Email:newEmail,
            ID:newId,
            Passward:newPw
        }];

        console.log(signupinfomation)
        alert("회원가입이 완료되었습니다.")
    }

return(
    <>
        <form className = "sign" style={{height: `${isFormSize}px`}}>
            {!isInfo && (<h3>Sign In</h3>)}
            {isInfo && (<h3>Sign Up</h3>)}

            {isInfo && (<div className="idpwd">
                <div className="name">
                    <label> Name </label>
                    <input type="text" id = "name" value={newName} onChange={handleNewName} placeholder="Enter Name"/> 
                
                </div>
                <div className="email">
                    <label> Email </label>
                    <input type="text" id = "email" value={newEmail} onChange={handleNewEmail} placeholder="Enter Email"/>

                </div>
                <div className="id">
                    <label> ID </label>
                    <input type="text" id = "new_id" value={newId} onChange={handleNewId} placeholder="Enter new ID"/> 
                    
                </div>
                <div className="pwd">
                    <label> Password </label>
                    <input type="password" id = "new_pw" value={newPw} onChange={handleNewPw} placeholder="Enter new password"/>

                </div>
            </div> )}

            {!isInfo && (<div className="idpwd">
                <div className="id">
                    <label htmlFor="input_id"> ID </label>
                    <input type="text" id = "input_id" value={inputId} onChange={handleInputId} placeholder="Enter ID"/> 
                    
                </div>
                <div className="pwd">
                    <label htmlFor="input_pw"> Password </label>
                    <input type="password" id = "input_pw" value={inputPw} onChange={handleInputPw} placeholder="Enter password"/>

                </div>
            </div> )}
            <div className='errorbox'>
                {idError && (<p>아이디를 입력해 주세요.</p>)}
                {pwError && (<p>비밀번호를 입력해 주세요.</p>)}
            </div>
            <div className="but">
                {!isInfo && (<button type="submit" id = "sub" onClick={onClickLogin}> 로그인 </button> )}
                {isInfo && (<button type="submit" onClick={onClickSignup}> 가입 </button>)}
            </div>

            <div className="signup">
                {!isInfo && (<button type="submit" id = "sgup" onClick={startSignUp} > 회원가입 </button>
                )}
                {isInfo && (<button type="submit"  onClick={startSignUp} > 취소 </button>
                )}
            </div>
            
        </form>
    </>
    );
}

export default Login ;