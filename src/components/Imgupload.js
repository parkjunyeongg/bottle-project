import '../../src/css/Imgupload.css';
import { useRef, useState } from "react";

const Imgupload = () => {
    const [imgFile, setImgFile] = useState("");
    const imgInput = useRef(); 

    const handleButtonClick = (e) => {
        imgInput.current.click();
    }
    
    const saveImgFile = () => {
        const file = imgInput.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setImgFile(reader.result);
           };
    };

return(
    <>
        <form className="imgup">
            <h3>bottle identification system </h3>
            <div className="imgspace">
            <img src={ imgFile } alt="병 이미지"/>
            <input type="file" ref={imgInput} onChange={saveImgFile} style={{display: "none"}} />

            </div>
            <div className="imgbutton">
                <button type="submit" id = "loadbutton" onClick={handleButtonClick}> load img </button>
            </div>
        </form>
    </>
    );
}
            
export default Imgupload;