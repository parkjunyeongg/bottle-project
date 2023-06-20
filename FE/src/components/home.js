
import '../../src/css/home.css';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const movePage = useNavigate();
    const goLogin= () => {
        movePage('login');
    }



return(
    <>
        <div className="home">
            <div className="project" >
                <h1>빈 병 자원 순환 프로그램.<br/>
                    빈 병 종류를 자동으로<br/>
                    판별하여 제공합니다.</h1>
                    {/*<button className="startbutton" onClick={goLogin}> 시작 </button>*/}
            </div>
        </div>
        
        
    </>
    );
}
            
export default Home;