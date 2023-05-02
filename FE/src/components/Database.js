import { useState, useEffect } from 'react';

const Database = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch("/getMember")
            .then(response => response.json())
            .then(json => setData(json))
    }, []);

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
                
    export default Database;