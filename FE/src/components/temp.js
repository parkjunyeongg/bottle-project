import React, { useState } from 'react';
import '../../src/css/styles.css'; // CSS 파일을 임포트합니다.


const Temp = ({data}) => {
    const [expandedRow, setExpandedRow] = useState(null);
  
    const handleRowClick = (index) => {
      if (expandedRow === index) {
        setExpandedRow(null);
      } else {
        setExpandedRow(index);
      }
    };
  
    return (
      <table>
        <thead>
          {/* 테이블 헤더 */}
        </thead>
        <tbody>
          {data.map((item, index) => (
            <React.Fragment key={index}>
              <tr className={expandedRow === index ? 'expanded' : ''}>
                {/* 행 내용 */}
                <td onClick={() => handleRowClick(index)}>
                  {/* 행 클릭 이벤트 */}
                </td>
              </tr>
              {expandedRow === index && (
                <tr className="expanded-row">
                  {/* 확장된 행 내용 */}
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    );
  };
  
                
    export default Temp;