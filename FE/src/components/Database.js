import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Database = () => {
    //로그 시간,위치 제일중요
    //이미지 판별된 순간 바로 실시간 로그 갱신
    const movePage = useNavigate();

    const goAdmin = () => {
      movePage('/admin')
    }

    return(
      
      <form className="dataform">
        <div className="datatable">
        <button onClick={goAdmin}> admin</button>
        <table>
          <thead>
            <tr>
                <th>ID</th>
                <th>time</th>
                <th>coordinate</th>
                <th>img</th>
            </tr>
          </thead>
          <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
          </tbody>
        </table>
      </div>
      </form>
        );
    }
                
    export default Database;