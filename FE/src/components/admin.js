import { useState, useEffect } from 'react';

const Admin = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/getMember")
            .then(response => response.json())
            .then(json => setData(json))
    }, []);
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신
    return(
        <div>
        <table>
          <thead>
            <tr>   
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.newid}>
                <td>{item.newid}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        );
    }
                
    export default Admin;