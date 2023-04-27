import '../../src/css/Login.css';


import { useState } from "react";

const Login = () => {
   
    const [isInfo, setInfo] = useState(false); // 회원가입 버튼 누름 확인
    const [isFormSize, setFormSize] =useState(350); //회원가입 버튼 누름시 창 확장

    const startSignUp = () => {
        setInfo(true); //회원가입 버튼을 누르면 true
        if (isFormSize === 350) {
            setFormSize(isFormSize + 150); //회원가입 버튼 누르면 sign의 form크기 150 확장
        } else if (isFormSize === 500) {
            setFormSize(isFormSize - 150); // 회원가입 취소시 sign의 form크기 150 줄어듬
        }
    }



return(
    <>
        <form className = "sign" style={{height: `${isFormSize}px`}}>
            {!isInfo && (<h3>Sign In</h3>)}
            {isInfo && (<h3>Sign Up</h3>)}
            {isInfo && (<div className="idpwd">
                <div className="name">
                    <label> Name </label>
                    <input type="text" id = "name" placeholder="Enter Name"/> 
                    
                </div>
                <div className="email">
                    <label> Email </label>
                    <input type="text" id = "email" placeholder="Enter Email"/>

                </div>
            </div> )}
            <div className="idpwd">
                <div className="id">
                    <label> ID </label>
                    <input type="text" id = "id" placeholder="Enter ID"/> 
                    
                </div>
                <div className="pwd">
                    <label> Password </label>
                    <input type="password" id = "pwd" placeholder="Enter password"/>

                </div>
            </div>
            <div className="but">
                {!isInfo && (<button type="submit" id = "sub"> 로그인 </button> )}
                {isInfo && (<button type="submit" onClick={startSignUp}> 가입 </button>)}
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