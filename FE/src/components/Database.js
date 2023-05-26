import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Database = () => {
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신
    const movePage = useNavigate();

    const goTest = () => {
      movePage('/testtemp')
    }

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://10.125.121.221:8080/getdalog")
            .then(response => response.json())
            .then(json => setData(json))
    }, []);

    return(
      
      <form className="dataform">
        <div className="datatable">
        
        {/*<button onClick={goTest}>table test</button>*/}
        <table>
          <thead>
            <tr>
                <th>작성일</th>
                <th>작성자</th>
                <th>종류</th>
                <th>좌표</th>
                <th>좌표</th>
                <th>좌표</th>
                <th>좌표</th>
                <th>인식률</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(20, data.length) }).map((_, index) => {
            const item = data[index];
            
            return (
            <tr key={index}>
              <td>{item?.createdDate}</td>
              <tb></tb>
              <td>{item?.name}</td>
              <td>{item?.x_min}</td>
              <td>{item?.x_max}</td>
              <td>{item?.y_min}</td>
              <td>{item?.y_max}</td>
              <td>{item?.confidence}</td>
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