import '../../src/css/Login.css';
import Mainbar from './Mainbar';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

//로컬 "proxy": "http://10.125.121.221:8080",
//서버 "proxy":"http://kshnx2.iptime.org:8080",

const Login = () => {
    const movePage = useNavigate();  //router
    
    const [isInfo, setInfo] = useState(false); // 회원가입 버튼 누름 확인 state
    const [isFormSize, setFormSize] =useState(400); //로그인 form 크기 state

    const [isLoginOpacity, setLoginOpacity] = useState(1); //표시 설정
    const [isSignOpacity, setSignOpacity] = useState(0);
    
    const [isLoginDisplay, setLoginDisplay] = useState("block");
    const [isSignDisplay, setSignDisplay] = useState("none");

    const [idError,setIdError] = useState(false)    // id,pw미입력 확인 state
    const [pwError,setPwError] = useState(false)
    const [signIdError, setSignIdError] = useState('')  //회원가입 조건 에러
    const [signPwdError, setSignPwdError] = useState('')

    const [idErrorCount, setIdErrorCount] = useState(0)
    const [pwdErrorCount, setPwdErrorCount] = useState(0)
    const [pwd1ErrorCount, setPwd1ErrorCount] = useState(0)

    const [isLogin, setLogin ] = useState(false); //login 했는지 안했는지

    const [loginData, setLoginData] = useState({  //로그인 정보 state
        id :'',
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
              /*fetch("/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;"
                },
                body: JSON.stringify(loginData)
                })
                
                .then((loginData) => {
                console.log('성공:', loginData);
                
                })
                .catch((error) => {
                console.error('실패:', error);
                });*/
                setLogin(true);
                console.log(isLogin);
                <Mainbar isLogin={isLogin} />
                movePage('');
                
        }
      };

    const [signUpData, setSingUpData] = useState({  //회원가입 정보 state
        member_name: '',
        member_email: '',
        member_id : '',
        member_pass : '',
    })

   

    const [confirmPassP, setConfirmPassP] = useState('') //비밀번호 확인 <p> 
    const [confirmPass, setConfirmPass] = useState(''); //비밀번호 확인 state
    const handleConfirmPassChange = (e) => {        //비밀번호 확인 const
        setConfirmPass(e.target.value);
      };
                                           
      useEffect(() => {
        if (signUpData.member_id !== '') {
            if (!/^[a-z0-9-_]{5,10}$/.test(signUpData.member_id)) {
                setSignIdError('아이디는 5~10자의 영문 소문자, 숫자와 특수기호(-,_)만 사용할 수 있습니다.');
                
            } else {
                setSignIdError('');
                
            }
        }
      }, [signUpData.member_id]);

      

    useEffect(() => {
        if (signUpData.member_pass !== '') {
            if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(signUpData.member_pass)) {
                setSignPwdError('비밀번호는 8~16자의 영문 대 소문자, 숫자, 특수문자를 사용해야 합니다.');
                
            } else {
                setSignPwdError('');
                
            }
        }
      }, [signUpData.member_pass]);

    

    useEffect(() => {
        if (confirmPass !== '') {
            if (confirmPass !== signUpData.member_pass) {
                setConfirmPassP('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
            } else {
                setConfirmPassP('');  
            }
        }
    }, [confirmPass, signUpData.member_pass]);

    useEffect(() => {
        if (isInfo) {
          if (signIdError === '아이디는 5~10자의 영문 소문자, 숫자와 특수기호(-,_)만 사용할 수 있습니다.') {
            setIdErrorCount(1);
            console.log(idErrorCount)
          } else if (signIdError === ''){
            if (isFormSize > 600)
            setIdErrorCount(2);
            console.log(idErrorCount)
          }
        }
      }, [signIdError, isInfo, idErrorCount]);
      
      useEffect(() => {
        if (isInfo) {
          if (signPwdError === '비밀번호는 8~16자의 영문 대 소문자, 숫자, 특수문자를 사용해야 합니다.') {
            setPwdErrorCount(1);
            console.log(pwdErrorCount)
          } else if (signPwdError === '') {
            setPwdErrorCount(2);
            console.log(pwdErrorCount)
          }
        }
      }, [signPwdError, isInfo, pwdErrorCount]);
      
      useEffect(() => {
        if (isInfo) {
          if (confirmPassP === '비밀번호와 비밀번호 확인이 일치하지 않습니다.') {
            setPwd1ErrorCount(1);
            console.log(pwd1ErrorCount)
          } else if (confirmPassP === '') {
            setPwd1ErrorCount(2);
            console.log(pwd1ErrorCount)
          }
        }
      }, [confirmPassP, isInfo, pwd1ErrorCount]);

    useEffect(() => {
        if (idErrorCount=== 1) {
            setFormSize(prevSize => prevSize + 50)
        } else if (idErrorCount === 2) {
            setFormSize(prevSize => prevSize - 50)
        }
        if (pwdErrorCount=== 1) {
            setFormSize(prevSize => prevSize + 50)
        } else if (pwdErrorCount === 2) {
            setFormSize(prevSize => prevSize - 50)
        }
        if (pwd1ErrorCount=== 1) {
            setFormSize(prevSize => prevSize + 50)
        } else if (pwd1ErrorCount === 2) {
            setFormSize(prevSize => prevSize - 50)
        }

    },[idErrorCount, pwdErrorCount, pwd1ErrorCount])


    const handleSignUpChange = (e) => {
        const { name, value } = e.target;
        setSingUpData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSignUpSubmit = (e) => {           //회원가입-----------------------------------------
        e.preventDefault();
        const { member_name, member_email, member_id, member_pass } = signUpData;

        if (!member_name || !member_email || !member_id || !member_pass) {
            alert('모든 정보를 입력해 주세요.');
        } else {
              /*fetch("http://kshnx2.iptime.org:8080/insertMember", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json;"
                },
                body: JSON.stringify(signUpData)
                })
                .then((signUpData) => {*/
                    if (!/^[a-z0-9]{5,10}$/.test(signUpData.member_id)) {
                        alert('아이디는 5~10자의 영문 소문자, 숫자와 특수기호(-,_)만 사용할 수 있습니다.');
                    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(signUpData.member_pass)) {
                        alert('비밀번호는 8~16자의 영문 대 소문자, 숫자, 특수문자를 사용해야 합니다.');
                    } else if (signUpData.member_pass !== confirmPass) {
                        alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
                    }else {
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
                        },500)
                    }
                    
                
                /*})
                .catch((error) => {
                    console.error('실패:', error)
                    alert("중복된 아이디입니다.")
                });*/
                
                
        }
      };


    const startSignUp = (e) => { //회원가입 버튼 누를시 
        e.preventDefault();
        setLoginOpacity(0)
        setIdError(false)
        setPwError(false)
        setFormSize(600); //회원가입 버튼 누르면 sign의 form크기 확장
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
            setFormSize(400);
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
                    <label htmlFor="name"> 이름 </label>
                    <input type="text" name="member_name" id = "member_name" value={signUpData.member_name} onChange={handleSignUpChange} /> 
                
                </div>
                <div className="email">
                    <label htmlFor="email"> 이메일 </label>
                    <input type="text" name="member_email" id = "member_email" value={signUpData.member_email} onChange={handleSignUpChange} />

                </div>
                <div className="id">
                    <label htmlFor="newid"> ID </label>
                    <input type="text" name="member_id" id = "member_id" value={signUpData.member_id} onChange={handleSignUpChange} placeholder="5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다."/> 
                    <div className="errorbox">{signIdError && <p>{signIdError}</p>}</div>
                </div>
                <div className="pwd">
                    <label htmlFor="newpw"> 비밀번호 </label>
                    <input type="password" name="member_pass" id = "member_pass" value={signUpData.member_pass} onChange={handleSignUpChange} placeholder="8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요."/>
                    <div className="errorbox">{signPwdError && <p>{signPwdError}</p>}</div>
                </div>
                <div className="pwd">
                    <label> 비밀번호 확인 </label>
                    <input type="password" name="confirm_pass" id = "confirm_pass" value={confirmPass} onChange={handleConfirmPassChange} />
                    <div className="errorbox">{confirmPassP && <p>{confirmPassP}</p>}</div>
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
                    <label htmlFor="input_pw"> 비밀번호 </label>
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