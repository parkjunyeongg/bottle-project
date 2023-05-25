import '../../src/css/Imgupload.css';
import { useState, useEffect } from "react";
//import Webcam from "react-webcam"; //<Webcam/>

const Imgupload = () => {
    const [imageSrc, setimageSrc] = useState('');
    const [imageUp, setImageUp] = useState(false);
    const [imageData, setImageData] = useState(null);

    /*const saveImgFile = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://kshnx2.iptime.org:8080/upload', {      //이미지 업로드
          method: 'POST',
          body : formData,
        })
        .then(data => console.log(data))
        
    }*/

    const saveImgFile = (e) => {
        setImageData(null);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://bottle4.iptime.org:8080/upload', {      //이미지 업로드
          method: 'POST',
          body : formData,
        })
        .then((response) => response.json())
        .then((data) => {
            const formattedData = {
                ...data,
                x_min: parseFloat(data.x_min).toFixed(3),
                x_max: parseFloat(data.x_max).toFixed(3),
                y_min: parseFloat(data.y_min).toFixed(3),
                y_max: parseFloat(data.y_max).toFixed(3),
                confidence: (parseFloat(data.confidence) * 100).toFixed(3) + '%',
              
              };
              formattedData.createdDate = new Date(formattedData.createdDate).toLocaleString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric'
              });
              setImageData(formattedData);
            })
        .catch((error) => console.log('Error:', error));

        setImageUp(true);
    }

    /*useEffect(() => {
        fetch("http://kshnx2.iptime.org:8080/download")    //이미지 다운로드
            .then(response => response.blob())
            .then(blob => {
              const objectUrl=URL.createObjectURL(blob);
              setimageSrc(objectUrl);
            });
    }, [imageSrc]); */

return(
    <>  
    
        <form className="imgup">
            <h3>bottle identification system </h3>
            {!imageUp && <div className="imgspace">
                <div className="textspace">
                    <h3>유의사항</h3>
                    <p>내용</p>
                </div>
                <div className="labelspace">
                    <h3>label 추가</h3>
                    <p>내용</p>
                </div> 
                <div className="imgbutton">
                    <input type="file" id = "input-file" onChange={saveImgFile} style={{display: 'none'}} />
                    <label className="input-file-button" htmlFor="input-file" id = "loadbutton"> 사진 올리기 </label>
                </div>
            </div>}
                {imageUp && <div className="imgdown">
                {imageSrc && (<img src={imageSrc} alt="병 이미지" style={{ maxWidth: '80%' }}/>)}
                <div className="bottleinfo">
                    <h3>판별 결과</h3>
                    {imageData == null && <div className="spinner"></div>}
                    {imageData !== null && Object.keys(imageData).length > 0 && (
                    <table>
                        <thead>
                            <tr>
                            <th>판별일</th>
                            <th>x_min</th>
                            <th>x_max</th>
                            <th>y_min</th>
                            <th>y_max</th>
                            <th>인식률</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>{imageData.createdDate}</td>
                            <td>{imageData.x_min}</td>
                            <td>{imageData.x_max}</td>
                            <td>{imageData.y_min}</td>
                            <td>{imageData.y_max}</td>
                            <td>{imageData.confidence}</td>
                            </tr>
                        </tbody>
                    </table>
                    )}
                </div>
                <div className="imgbutton">
                    <input type="file" id = "input-file" onChange={saveImgFile} style={{display: 'none'}} />
                    <label className="input-file-button" htmlFor="input-file" id = "loadbutton"> 다시 올리기 </label>
                </div>
            </div> }
        </form>
    </>
    );

}
            
export default Imgupload;