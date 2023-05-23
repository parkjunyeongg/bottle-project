import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Database = () => {
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신
    const movePage = useNavigate();

    const goAdmin = () => {
      movePage('/admin')
    }

    const goTest = () => {
      movePage('/testtemp')
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://kshnx2.iptime.org:8080/getMember")
            .then(response => response.json())
            .then(json => setData(json))
    }, []);

    return(
      
      <form className="dataform">
        <div className="datatable">
        <button onClick={goAdmin}> admin</button>
        {/*<button onClick={goTest}>table test</button>*/}
        <table>
          <thead>
            <tr>
                <th>작성일</th>
                <th>작성자</th>
                <th>종류</th>
                <th>좌표</th>
                <th>성공유무</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(20, data.length) }).map((_, index) => {
            const item = data[index];
            return (
            <tr key={index}>
              <td>{item?.member_date}</td>
              <td>{item?.member_id}</td>
              <td>{item?.member_name}</td>
              <td>{item?.member_email}</td>
              <td>{item?.member_bottle}</td>
            </tr>
            );
          })}
          </tbody>
        </table>
      </div>
      </form>
        );
    }
                
    export default Database;