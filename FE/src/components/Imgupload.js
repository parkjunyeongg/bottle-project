import '../../src/css/Imgupload.css';
import { useState, useEffect } from "react";
//import Webcam from "react-webcam"; //<Webcam/>

const Imgupload = () => {
    const [imageSrc, setimageSrc] = useState('');
    const [imageUp, setImageUp] = useState(false);
    
    const testbutton = () => {
        setImageUp(true);
    }

    const saveImgFile = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);

        fetch('http://kshnx2.iptime.org:8080/upload', {      //이미지 업로드
          method: 'POST',
          body : formData,
        })
        .then(data => console.log(data))
        
    }

    useEffect(() => {
        fetch("http://kshnx2.iptime.org:8080/download")    //이미지 다운로드
            .then(response => response.blob())
            .then(blob => {
              const objectUrl=URL.createObjectURL(blob);
              setimageSrc(objectUrl);
            });
    }, [imageSrc]);

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
                    <label className="input-file-button" htmlFor="input-file" id = "loadbutton"> 사진 올리기 </label>
                </div>
            </div>}
                {imageUp && <div className="imgdown">
                <input type="file" id = "input-file" onChange={saveImgFile} style={{display: 'none'}} />
                {imageSrc && (<img src={imageSrc} alt="병 이미지" style={{ maxWidth: '80%' }}/>)}
                <div className="bottleinfo">
                    <h3>판별 결과</h3>
                    <p>내용</p>
                </div>
                <div className="imgbutton">
                    <label className="input-file-button" htmlFor="input-file" id = "loadbutton"> 다시 올리기 </label>
                </div>
            </div> }
        </form>
        <button onClick={testbutton}> test button</button>
    </>
    );

}
            
export default Imgupload;