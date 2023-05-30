import '../../src/css/databs.css';
import { useState, useEffect } from 'react';

const Admin = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://bottle4.iptime.org:8080/getMember")
            .then(response => response.json())
            .then(json => setData(json))
    }, []);
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신
    return(
      <form className="dataform">
        <div className="datatable">
        <table>
          <thead>
            <tr>
                <th>ID</th>
                <th>이름</th>
                <th>Email</th>
                <th>가입일</th>
                <th>성공/실패</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.max(20, data.length) }).map((_, index) => {
            const item = data[index];
            return (
            <tr key={index}>
              <td>{item?.member_id}</td>
              <td>{item?.member_name}</td>
              <td>{item?.member_email}</td>
              <td>{item?.member_date}</td>
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
                
    export default Admin;