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
                <h1>빈 병 자원 순환 프로그램의<br/>
                    빈 병 종류, 크기 및 파손 정도<br/>
                    자동 판별 서비스의 제공입니다.</h1>
                    <button className="startbutton" onClick={goLogin}> 시작 </button>
            </div>
            <div>
                
            </div>
        </div>
        
    </>
    );
}
            
export default Home;