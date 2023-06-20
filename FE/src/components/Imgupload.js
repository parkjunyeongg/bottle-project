import '../../src/css/Imgupload.css';
import { useState, useEffect } from "react";
//import Webcam from "react-webcam"; //<Webcam/>

const Imgupload = () => {
    const [imageSrc, setimageSrc] = useState('');   //이미지 src
    const [imageUp, setImageUp] = useState(false); //이미지 upload 확인
    const [imageData, setImageData] = useState(null); //이미지정보

    const saveImgFile = (e) => {
        setimageSrc(null);
        setImageData(null);
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('http://bottle4.asuscomm.com:8080/upload', { //로컬/배포      //이미지 업로드
        //fetch('http://10.125.121.221:8080/upload', { //테스트      
          method: 'POST',
          body : formData,
        })
        .then((response) => response.json())
        .then((data) => {
            let base64Data = null;

            if (data.length > 0) {
            base64Data = data.pop(); // 마지막 JSON을 base64Data로 추출하고 배열에서 제거
            }

            const formattedData = data.map((item) => ({  
                ...item,
                x_min: parseFloat(item.x_min).toFixed(0),
                x_max: parseFloat(item.x_max).toFixed(0),
                y_min: parseFloat(item.y_min).toFixed(0),
                y_max: parseFloat(item.y_max).toFixed(0),
                name : item.name,
                confidence: (parseFloat(item.confidence) * 100).toFixed(0) + '%',
                createdDate: new Date(item.createdDate).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric',
                }),
            }));

            //console.log(formattedData);
            //console.log(base64Data.data);

            // base64 디코딩하여 JSON 객체로 변환
            const byteCharacters = atob(base64Data.data);
            const byteArrays = [];
            for (let i = 0; i < byteCharacters.length; i++) {
            byteArrays.push(byteCharacters.charCodeAt(i));
            }
            const byteArray = new Uint8Array(byteArrays);
            const blob = new Blob([byteArray], { type: 'image/jpeg' });
            const imageURL = URL.createObjectURL(blob);

            
            setimageSrc(imageURL);
            setImageData(formattedData);
        })
    .catch((error) => console.log('Error:', error));
    
        setImageUp(true);
    }

return(
    <>  
    
        <form className="imgup">
            <h1 className="title">Bottle identification system </h1>
            {!imageUp && <div className="imgspace">
                <div className="textspace">
                    <h3>병 사진만 업로드 해주세요.</h3>
                    <p>※모든 사진은 데이터베이스에 저장되오니, 개인적인 사진을 올리는것에 주의해주세요.</p>
                </div>
                <div className="imgbutton">
                    
                    <input type="file" id = "input-file" onChange={saveImgFile} style={{display: 'none'}} />
                    <label className="input-file-button" htmlFor="input-file" id = "loadbutton"> 사진 올리기 </label>
                </div>
            </div>}
                {imageUp && <div className="imgdown">
                    <h3>판별 결과</h3>
                    {imageSrc && (<img src={imageSrc} alt="병 이미지" style={{ maxWidth: '65%' }}/>)}
                <div className="bottleinfo">
                    {imageData == null && <div className="spinner"></div>}
                    {imageData !== null && Object.keys(imageData).length > 0 && (
                    <table>
                        <thead>
                            <tr>
                            <th>판별일</th>
                            <th>종류</th>
                            <th>x_min</th>
                            <th>x_max</th>
                            <th>y_min</th>
                            <th>y_max</th>
                            <th>인식률</th>
                            </tr>
                        </thead>
                        <tbody>
                        {Object.keys(imageData).map((key) => {
                            const data = imageData[key];
                            return (
                            <tr key={key}>
                                <td>{data.createdDate}</td>
                                <td>{data.name}</td>
                                <td>{data.x_min}</td>
                                <td>{data.x_max}</td>
                                <td>{data.y_min}</td>
                                <td>{data.y_max}</td>
                                <td>{data.confidence}</td>
                            </tr> );
                        })}
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