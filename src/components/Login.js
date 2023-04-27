import '../../src/css/Login.css';
import { StyledSell } from '../../src/css/Login.css';
import styled, { keyFrames } from 'styled-components';
import { useState } from "react";

const Login = () => {
   
    const [isInfo, setInfo] = useState(false);
    //const [inup, setinup] = useState("");

    const startSignUp = () => {
        setInfo(true);
    }

    const animation = keyFrames`
     0% {
        transform:rotate(0deg);
        border-radius:0px;
    }
    50% {
        border-radius:100px;
    }
    100%{
        transform:rotate(360deg);
        border-radius:0px;
    }
    `;

const Box = styled.div`
    height: 200px;
    width: 200px;
    background-color: tomato;
    animation:${animation} 1s linear infinite; //1초동안 선형 무한 속성값주기
    `;

return(
    <>
        <form className = "sign">
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
                {!isInfo && (<button type="submit" id = "sgup" onClick={startSignUp} StyledSell isInfo={isInfo}> 회원가입 </button>
                )}
                {isInfo && (<button type="submit"  onClick={startSignUp} StyledSell isInfo={isInfo}> 취소 </button>
                )}
            </div>
            
        </form>

        
        <Box>
            <span>☺️</span> 
        </Box>
        
    </>
    );
}

export default Login ;