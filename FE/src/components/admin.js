import '../../src/css/databs.css';
import { useState, useEffect } from 'react';

const Admin = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("http://kshnx2.iptime.org:8080/getMember")
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
                <th className="thid">ID</th>
                <th className="thtime">Name</th>
                <th className="thadd">Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.member_id}>
                <td>{item.member_id}</td>
                <td>{item.member_name}</td>
                <td>{item.member_email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </form>
        );
    }
                
    export default Admin;