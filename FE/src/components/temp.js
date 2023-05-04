import '../../src/css/Imgupload.css';
import { useRef, useState } from "react";
//import Webcam from "react-webcam"; //<Webcam/>

const Imgupload = () => {
   const [imgFile, setImgFile] = useState(null);
    const imgInput = useRef(); 

    const handleButtonClick = () => {
        imgInput.current.click();
    };
    
    const saveImgFile = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append('file', file);
        setImgFile(file)

        fetch('/upload', {
            method: 'POST',
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            body : formData,
        })
        .then(response => response.json())

        .then(data => console.log(data))

        .catch(error => console.error(error));

        /*reader.onloadend = () => {
            setImgFile(reader.result);
           };

        if (file) {
            reader.readAsDataURL(file);
            console.log(reader.readAsDataURL(file))
        } else {
            setImgFile(null);
        }*/
    
    }
    
return(
    <>
        <form className="imgup">
            <h3>bottle identification system </h3>
            <div className="imgspace">
            <input type="file" onChange={saveImgFile}  />
            {imgFile && (<img src={URL.createObjectURL(imgFile)} alt="병 이미지" style={{ maxWidth: '80%' }} />)}
    
            <div className="imgbutton">
                <button type="submit" id = "loadbutton" onClick={handleButtonClick}> load img </button>
            </div>

            </div>
            
        </form>
    </>
    );

}
            
export default Imgupload;