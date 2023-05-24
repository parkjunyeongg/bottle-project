import '../../src/css/Mypage.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Mypage = () => {

    const [lastData, setLastData] = useState([]);

    const movePage = useNavigate();
    const goImg = () =>  {
        movePage('/imgupload');
    }
    
    /*useEffect(() => {
        fetch("http://kshnx2.iptime.org:8080/getMember")
            .then(response => response.json())
            .then(json => setData(json))
    }, []);*/

return(
    <>
        <div className="myPageDiv"> 
            <div className="pointBox">
                <h2>보유 포인트</h2>
                    <h2>0P</h2>
            </div>
            <div className="myInfoBox">
                <h2>개인정보 관리</h2>
                    <p>이름</p>
                    <p>전화번호</p>
            </div>
            <div className="bottleInfoBox">
                <h2>투입 자원 정보</h2>
                    <p>대형</p>
                    <p>중형</p>
                    <p>소형</p>
                <button className="imgupbutton" onClick={goImg}>이미지 업로드</button>
            </div>
            
            <div className="tableBox">
                <h2>최근 내역</h2>
                    <div className="datatable">
                        <table>
                        <thead>
                            <tr>
                                <th>작성 일</th>
                                <th>종류</th>
                                <th>좌표</th>
                                <th>성공유무</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: Math.max(10, lastData.length) }).map((_, index) => {
                            const item = lastData[index];
                            return (
                            <tr key={index}>
                            <td>{item?.member_id}</td>
                            <td>{item?.member_name}</td>
                            <td>{item?.member_email}</td>
                            <td>{item?.member_address}</td>
                            </tr>
                            );
                        })}
                        </tbody>
                        </table>
                    </div>
            </div>
        </div>
    </>
    );
}
            
export default Mypage;