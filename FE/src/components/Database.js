//import { useState, useEffect } from 'react';
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

    return(
      
      <form className="dataform">
        <div className="datatable">
        <button onClick={goAdmin}> admin</button>
        <button onClick={goTest}>table test</button>
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
              <tr>
                <td></td>
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